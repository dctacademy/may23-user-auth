const greetCltr = {}

greetCltr.welcome = function(req, res){
    res.json({ 
        message: 'welcome to the website'
    })
}

greetCltr.goodbye = function(req, res){
    res.json({
        message: 'thank you for visiting the site'
    })
}

module.exports = greetCltr 