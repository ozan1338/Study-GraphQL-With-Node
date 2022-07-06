module.exports = {
    users(parent,args,{ db },info) {
        if (!args.query) {
            if(args.Sort == true) {
            return db.dummyDataUsers.sort((a,b) => {
                    let nameA = a.name.toLowerCase(),
                        nameB = b.name.toLowerCase()
                    //console.log(nameA)
                    if(nameA < nameB) {
                        return -1;
                    }
                    if(nameA > nameB) {
                        return 1;
                    }
                    return 0
                })
            }

            return db.dummyDataUsers
        }
        
        let result = []

        result = db.dummyDataUsers.filter(item => {
            return item.name.toLowerCase().includes(args.query.toLowerCase())
        })

        if(args.Sort == true) {
            return result.sort((a,b) => {
                let nameA = a.name.toLowerCase(),
                    nameB = b.name.toLowerCase()
                //console.log(nameA)
                if(nameA < nameB) {
                    return -1;
                }
                if(nameA > nameB) {
                    return 1;
                }
                return 0
            })
        }

        return result
    },
    posts(parent,args,{ db },info) {
        if (!args.query) {
            if(args.Sort == true) {
                return db.dummyDataPosts.sort((a,b) => {
                    let titleA = a.title.toLowerCase(),
                    titleB = b.title.toLowerCase()
                    
                    if(titleA < titleB) {
                        return -1
                    }
                    if(titleB > titleB) {
                        return 1
                    }
                    return 0
                })
            }
            
            
            // console.log(db.dummyDataPosts)

            return db.dummyDataPosts
        }
        
        let result = []

        result = db.dummyDataPosts.filter(item => {
            return item.title.toLowerCase().includes(args.query.toLowerCase())
        })

        if(args.Sort == true) {
            return result.sort((a,b) => {
                let titleA = a.title.toLowerCase(),
                    titleB = b.title.toLowerCase()

                    if(titleA < titleB) {
                        return -1
                    }
                    if(titleB > titleB) {
                        return 1
                    }
                    return 0
            })
        }

        console.log("WHYY")

        return result
    },
    me() {
        user = {
            id: 'abc123',
            name: 'Ozan',
            email: 'ozan@mail.com',
            age: 17
        }
        return user
    },
    post() {
        post = {
            id: '1122',
            title: 'Study',
            body: 'This is Body',
            published: true
        }
        return post
    },
    comments(parent,args,{ db },info) {
        return db.dummyDataComments
    }
}