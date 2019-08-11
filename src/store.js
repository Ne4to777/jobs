/* eslint no-param-reassign:0 */
/* eslint no-return-assign:0 */
import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import { isArray } from './assets/utility'

Vue.use(Vuex)

const mapSetMutations = props => props.reduce((acc, el) => {
	acc[`set_${el}`.toUpperCase()] = (state, item) => state.current[el] = item
	return acc
}, {})

const mapResetMutations = props => props.reduce((acc, el) => {
	acc[`reset_${el}`.toUpperCase()] = (state, item) => state.current[el] = item
	return acc
}, {})


const mapSetActions = props => props.reduce((acc, mutation) => {
	acc[`set_${mutation}`] = (context, item) => context.commit(`set_${mutation}`.toUpperCase(), item)
	return acc
}, {})

const mapResetActions = props => props.reduce((acc, mutation) => {
	acc[`reset_${mutation}`] = (context) => context.commit(
		`reset_${mutation}`.toUpperCase(), context.state.defaults[mutation]
	)
	return acc
}, {})


const props = {
	items: [],
	description: undefined,
	location: undefined,
	lat: undefined,
	long: undefined,
	page: 1,
	byCoords: false,
	scrollPosition: 0
}

const propNames = Reflect.ownKeys(props)

export default new Vuex.Store({
	state: {
		defaults: Object.freeze(props),
		current: { ...props }
	},
	getters: {
		items: state => state.current.items,
		getItemById: state => id => state.current.items
			? state.current.items.find(el => el.id === id)
			: undefined
	},
	mutations: {
		...mapSetMutations(propNames),
		SET_ITEMS: (state, items) => state.current.items = state.current.items.concat(
			(isArray(items)
				? items
				: [items]
			)
				.map(el => {
					const date = el.created_at
						? moment(new Date(el.created_at))
							.startOf('day')
							.fromNow()
						: '-'
					return { ...el, date }
				})
		),
		...mapResetMutations(propNames)
	},
	actions: {
		...mapSetActions(propNames),
		set_items: (context, items) => context.commit('SET_ITEMS', items),
		...mapResetActions(propNames)
	}
})
