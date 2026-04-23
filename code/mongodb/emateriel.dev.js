//pour se connecter :mongosh -u root -p --authenticationDatabase admin
//pour selectionner: la base use emateriel_dev
//pour charger un ficher: load("emateriel.dev.js")
//supprimer une base: db.dropDatabase()
//pour tout selectionner: db.contact.find()
//pour voir: show collections

db.contact.insertMany([
    {
        email:'user1@user.com',
        subject: 'coco',
        message: 'bobo',
        date:'2020-01-01T09:00:01:0000Z',
    },
    {
        email:'user2@user.com',
        subject: 'cucu',
        message: 'bebe',
        date:'2021-02-02T10:10:10:0010Z',
    }
])