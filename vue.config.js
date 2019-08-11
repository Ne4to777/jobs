module.exports = {
	devServer: {
		port: 3000,
		proxy: {
			'/api': {
				target: {
					host: 'jobs.github.com',
					protocol: 'https:',
				},
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
}
