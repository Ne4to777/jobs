<template>
	<div>
		<div class="uk-card uk-card-default uk-card-body uk-margin-small-top">
			<div>
				<div>Description</div>
				<input
					class="uk-input"
					type="text"
					placeholder="Filter by title, benefits, companies, expertise"
					v-model="description"
					name="description"
					@input="onInput"
				/>
			</div>
			<div v-if="!byCoords" class="uk-margin-small-top">
				<div>Location</div>
				<input
					class="uk-input"
					type="text"
					placeholder="Filter by city, state, zip code or country"
					v-model="location"
					name="location"
					@input="onInput"
				/>
			</div>
			<div v-if="byCoords" class="uk-margin-small-top">
				<div class="uk-width-1-2 uk-inline">
					<div>Latitude</div>
					<input
						class="uk-input"
						type="text"
						placeholder="12.3456789"
						v-if="byCoords"
						v-model="lat"
						name="lat"
						@input="onInput"
					/>
				</div>
				<div class="uk-width-1-2 uk-inline">
					<div>Longitude</div>
					<input
						class="uk-input"
						type="text"
						placeholder="12.3456789"
						v-if="byCoords"
						v-model="long"
						name="long"
						@input="onInput"
					/>
				</div>
			</div>
			<div class="uk-margin-top uk-inline uk-width-1-1">
				<input
					type="button"
					class="uk-button uk-button-default"
					value="Search"
					ref="SearchButton"
					@click="onSearchClick"
				/>
				<label>
					<input
						type="checkbox"
						class="uk-checkbox uk-margin-left"
						v-model="byCoords"
						@click="onCheckboxClick"
						name="byCoords"
					/>
					by coordinates
				</label>
				<input
					type="button"
					class="uk-button uk-button-default uk-position-right"
					value="Reset"
					@click="reset"
				/>
			</div>
		</div>
		<div
			class="uk-card uk-card-default uk-card-body uk-margin-small-top"
			v-if="items.length ||isPending||hasNoFounds"
		>
			<company-card :value="item" v-for="item in items" class="results-item" @click="onItemClick" />
			<div v-if="isPending" uk-spinner class="uk-text-center uk-margin-small" style="display:block"></div>
			<div v-if="hasNoFounds">Not found</div>
		</div>
		<a
			href="#"
			uk-totop
			uk-scroll
			class="uk-position-top-right uk-position-fixed uk-position-medium"
			v-if="items.length && $store.state.current.scrollPosition"
		></a>
	</div>
</template>

<script>
import axios from 'axios'
import UIkit from 'uikit'
import CompanyCard from '@/components/CompanyCard.vue'
import { isObjectFilled, isArrayFilled } from '@/assets/utility'

const mapProps = props =>
	props.reduce((acc, el) => {
		acc[el] = {
			set(value) {
				this.setProp(el, value)
			},
			get() {
				return this.getProp(el)
			}
		}
		return acc
	}, {})

export default {
	name: 'home',
	components: {
		CompanyCard
	},
	created() {
		this.bindPressEnter()
		this.bindScroll()
		;['description', 'location', 'lat', 'long', 'page', 'byCoords'].map(
			this.setPropFromRoute
		)
	},
	beforeDestroy() {
		this.unbindPressEnter()
		this.unbindScroll()
	},
	data() {
		return {
			isPending: false,
			hasNoFounds: false,
			requestCancel: _ => _
		}
	},
	computed: {
		queryParams() {
			const params = {
				description: this.description,
				location: this.location
			}
			return this.byCoords
				? { ...params, lat: this.lat, long: this.long }
				: params
		},
		...mapProps([
			'items',
			'description',
			'location',
			'lat',
			'long',
			'byCoords',
			'page'
		])
	},
	methods: {
		async search() {
			console.log('searching...')
			this.isPending = true
			const CancelToken = axios.CancelToken
			const result = await axios
				.get('/api/positions.json', {
					params: {
						...this.queryParams,
						page: this.page
					},
					cancelToken: new CancelToken(c => {
						this.requestCancel = c
					})
				})
				.catch(err => {
					if (axios.isCancel(err)) {
						console.log('Request canceled')
					} else {
						console.log(err.message)
					}
				})

			if (isObjectFilled(result)) {
				const data = result.data
				if (isArrayFilled(data)) {
					this.setProp('items', data)
				} else {
					this.unbindScroll()
					if (!isArrayFilled(this.items)) {
						this.hasNoFounds = true
					}
				}
			}
			this.isPending = false
		},
		syncDataToQuery(name) {
			this.$router.replace({
				query: {
					...this.$route.query,
					[name]: this[name] || undefined
				}
			})
		},
		getProp(name) {
			return this.$store.state.current[name]
		},
		setProp(name, value) {
			this.$store.dispatch(`set_${name}`, value)
		},
		setPropFromRoute(name) {
			if (this.$route.query.hasOwnProperty(name)) {
				this.setProp(name, this.$route.query[name])
			}
		},
		reset() {
			this.unbindScroll()
			Reflect.ownKeys(this.$store.state.defaults).map(this.resetProp)
			this.hasNoFounds = false
			if (isObjectFilled(this.$route.query)) {
				this.$router.replace({
					query: {}
				})
			}
			this.requestCancel()
		},
		resetProp(name) {
			this.$store.dispatch(`reset_${name}`, this.$store.state.defaults[name])
		},
		onSearchClick() {
			this.bindScroll()
			this.resetProp('items')
			this.resetProp('page')
			this.hasNoFounds = false
			this.search()
		},
		onScroll({
			target: {
				scrollingElement: { scrollTop, clientHeight, scrollHeight }
			}
		}) {
			if ('scrollRestoration' in history) {
				history.scrollRestoration = 'manual'
			}
			this.setProp('scrollPosition', scrollTop)
			if (
				!this.isPending &&
				Math.ceil(scrollTop + clientHeight) >= scrollHeight
			) {
				this.setProp('page', this.page + 1)
				this.search()
			}
		},
		onCheckboxClick(e) {
			const { location, lat, long, byCoords, ...params } = this.$route.query
			let locParams
			if (e.target.checked) {
				this.resetProp('location')
				locParams = { byCoords: true, lat, long }
			} else {
				this.resetProp('lat')
				this.resetProp('long')
				locParams = { location }
			}
			this.$router.replace({
				query: {
					...params,
					...locParams
				}
			})
		},
		onItemClick(e) {
			this.requestCancel()
		},
		onInput(e) {
			this.syncDataToQuery(e.target.name)
		},
		onPressEnter(e) {
			if (e.key == 'Enter' && !this.isPending) {
				this.$refs.SearchButton.click()
			}
		},
		bindScroll() {
			window.addEventListener('scroll', this.onScroll)
		},
		unbindScroll() {
			window.removeEventListener('scroll', this.onScroll)
		},
		bindPressEnter() {
			window.addEventListener('keydown', this.onPressEnter)
		},
		unbindPressEnter() {
			window.removeEventListener('keydown', this.onPressEnter)
		}
	}
}
</script>


<style lang="stylus" scoped>
.results-item
	margin 10px 0
</style>
