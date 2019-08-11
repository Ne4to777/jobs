<template>
	<router-link :to="value.id" class="uk-card card">
		<table class="uk-table table">
			<tbody>
				<tr>
					<td class="uk-text-primary padding-right">{{value.title}}</td>
					<td class="uk-width-1-3 uk-text-small uk-text-muted">{{value.location}}</td>
				</tr>
				<tr>
					<td class="padding-right">
						<span class="uk-text-small uk-text-muted">{{value.company}}</span>
						-
						<span class="uk-text-small uk-text-success">{{value.type}}</span>
					</td>
					<td class="uk-width-1-4 uk-text-muted">{{value.date}}</td>
				</tr>
			</tbody>
		</table>
	</router-link>
</template>

<script>
import moment from 'moment'
export default {
	props: {
		value: Object
	}
}
</script>

<style lang="stylus">
.card
	display block
	cursor pointer
	text-decoration none

	&:hover
		text-decoration none

	&:visited
		color auto

.table td:nth-child(odd)
	padding 0 10px 0 0

.table td:nth-child(even)
	padding 0
</style>