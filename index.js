const http = require('http')
const fs = require('fs')
const htmlFileSource = './Data/main.html'
const jsonFileSource = './Data/jsonData.json'
const errorImage = './Data/5203299.jpg'

const server = http.createServer( (request,response) => {
    const url = request.url   
    if(url === '/html'){
        response.writeHead(200,{"Content-type" : "text/html"})
        const content = fs.readFileSync(htmlFileSource)
        response.write(content)
        response.end()
    } 
    else if(url === '/json'){
        response.writeHead(200,{"Content-type" : "application/json"})
        let content = fs.readFileSync(jsonFileSource)
        content = JSON.stringify(content)
        response.write(content)
        response.end()
    }
    else if(url == '/uuid'){
        response.writeHead(200,{'Content-type' : 'application/json'})
        response.write(`{
            "uuid": "14d96bb1-5d53-472f-a96e-b3a1fa82addd"
        }`)
        response.end()
    }
    else if( url.includes('status')){
        const urlArray = request.url.split('/')
        console.log(urlArray)
        statusCode = urlArray[2]
        response.writeHead(Number(statusCode),{'Content-type' : 'text/html'})
        response.write(`Request Message : ${http.STATUS_CODES[statusCode]}`)
        response.end()
    }
    else if(url.includes('/delay/')){
        response.writeHead(200,{'Content-type' : 'text/html'})
        const timeDelayArray = request.url.split('/')
        const timeRequired = Number(timeDelayArray[2]) * 1000
        setTimeout( () => {
            response.end(`Delay of ${timeRequired/1000} sec`)
        },timeRequired)
    }
    else{
        response.writeHead(404,{'Content-type' : 'image/jpeg'})
        const image = fs.readFileSync(errorImage)
        response.end(image)
    }
})

server.listen(8000)


