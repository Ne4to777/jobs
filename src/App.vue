<template>
	<div id="app" class="uk-container">
		<div class="uk-width-2-3 uk-margin-auto uk-margin-small-top" style="min-width:430px">
			<div class="uk-card uk-card-default uk-card-header">
				<p class="uk-h4">Company Hunter</p>
			</div>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
export default {
	name: 'jobs'
}
</script>

<style lang="stylus">
@import './assets/stylus/fonts.styl'
@import './assets/stylus/global.styl'
@import './../node_modules/uikit/dist/css/uikit.min.css'

a
	word-break break-all

body
	font-family Roboto
	font-weight $font-weight_base
	font-size $font-size_very-small
	margin 0
</style>
