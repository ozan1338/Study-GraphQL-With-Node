module.exports = {
    count: {
        subscribe(parent, args, context, info) {
            let {pubsub} = context

            let count = 0

            setInterval(() => {
                count++
                pubsub.publish('count', {
                    count
                })
            }, 1000)

            return pubsub.asyncIterator('count')
        }
    }
}