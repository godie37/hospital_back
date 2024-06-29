const app= require('./app');



// app.listen(app.get('port'), ()=> {
//         console.log("- OK - http://localhost:3000 - Server en puerto: ", app.get("port"));
// });

app.listen(app.get('port'), () => {
        console.log('\n==================================================')
        console.log(`🚀 Servidor corriendo en: http://localhost:`, app.get('port'))
        console.log('==================================================\n')
});