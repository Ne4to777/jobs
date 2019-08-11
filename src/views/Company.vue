<template>
	<div>
		<div class="uk-card uk-card-default uk-margin-small-top">
			<not-found v-if="isNotFound" />
			<div v-if="isPending" uk-spinner class="uk-text-center uk-card-header" style="display:block"></div>
			<div v-if="!isPending && item">
				<div class="uk-card-header">
					<a href="#" @click.prevent="$router.go(-1)" class="uk-display-block">See all positions</a>
					<time class="uk-margin-small-top uk-display-block">{{item.company}}/{{item.type}}</time>
					<div class="uk-grid-small uk-flex-middle" uk-grid>
						<div class="uk-width-expand">
							<h3 class="uk-card-title uk-margin-remove-bottom">{{item.title}}</h3>
							<p class="uk-text-meta uk-margin-remove-top">
								<time>{{item.date}}</time>
							</p>
						</div>
					</div>
				</div>
				<div class="uk-card-body" v-html="item.description"></div>
				<div class="uk-card-footer">
					<span>Go to apply:</span>
					<span v-html="item.how_to_apply"></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import NotFound from '@/components/NotFound'
export default {
	components: {
		NotFound
	},
	async created() {
		this.isPending = true
		const item =
			this.getItemByIdFromStore(this.$route.params.id) ||
			(await this.getFromWeb().catch(_ => {
				this.isNotFound = true
			}))
		console.log(item)
		if (item) {
			this.$store.dispatch('set_items', item)
			this.item = this.getItemByIdFromStore(item.id)
		} else {
		}
		this.isPending = false
	},
	data() {
		return {
			item: null,
			isPending: false,
			isNotFound: false
		}
	},
	methods: {
		async getFromWeb() {
			const result = await axios.get(
				`/api/positions/${this.$route.params.id}.json`
			)
			return result.data
		}
	},
	computed: {
		...mapGetters({
			getItemsFromStore: 'items',
			getItemByIdFromStore: 'getItemById'
		})
	}
}
</script>

<style lang="styl" scoped>
</style>