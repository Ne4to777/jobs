import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

const getBundle = (file, plugins = []) => ({
	input: './src/index.js',
	output: [{
		globals: {
			axios: 'axios',
		},
		sourcemap: true,
		sourcemapExcludeSources: true,
		name: 'jobs',
		file: `dist/${file}`,
		format: 'iife'
	}],
	external: ['axios'],
	plugins: [
		...plugins,
		resolve(),
		commonjs(),
		babel({
			exclude: 'node_modules/**',
			extensions: ['.js']
		})
	]
})

export default [
	// getBundle('index.js'),
	getBundle('index.min.js', [terser()])
]
