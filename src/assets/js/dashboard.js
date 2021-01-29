connect();

async function connect() {
    const urlQlikServer = "https://r0737692.eu.qlikcloud.com/";
    const urlLoggedIn = "/api/v1/audits";//Use GET request to see if you are authenticated
    const urlLogin = "/login";
    const webIntegrationId = '23PrLnZKSKaZwHvtQqxlMLCum_HGQ1IC';

    //Check to see if logged in
    return await fetch(`${urlQlikServer}${urlLoggedIn}`, {
        credentials: 'include',
        headers: {
            'Qlik-Web-Integration-ID': webIntegrationId
        }
    })
        .then(async function (response) {

            //check if user is authenticated; if not, redirect to login page
            if (response.status === 401) {
                const url = new URL(`${urlQlikServer}/login`);
                url.searchParams.append('returnto', 'https://testyentl.sinners.be');
                url.searchParams.append('qlik-web-integration-id', webIntegrationId);
                window.location.href = url;
            }
        })
        .catch(function (error) {
            console.error(error);
        });
}

var config1 = {
    host: "r0737692.eu.qlikcloud.com", //the address of your Qlik Engine Instance
    prefix: "/", //or the virtual proxy to be used. for example "/anonymous/"
    port: 443, //or the port to be used if different from the default port  
    isSecure: true, //should be true if connecting over HTTPS
    webIntegrationId: '23PrLnZKSKaZwHvtQqxlMLCum_HGQ1IC' //only needed in SaaS editions and QSEoK
};

require.config({
    baseUrl: (config1.isSecure ? "https://" : "http://") + config1.host + (config1.port ? ":" + config1.port : "") + config1.prefix + "resources",
    webIntegrationId: config1.webIntegrationId
});

require(["js/qlik"], function (qlik) {

    qlik.on("error", function (error) {
        $('#popupText').append(error.message + "<br>");
        $('#popup').fadeIn(1000);
    });
    $("#closePopup").click(function () {
        $('#popup').hide();
    });

    //open apps -- inserted here --
    var app = qlik.openApp("9bf09106-81e8-4af1-a5b6-02c3fa7acadc", config1);
    //get objects -- inserted here --
    app.getObject('QV02', '962c4cdc-2836-419d-b757-e4552f638aa9');
    app.getObject('QV03', 'gEcVf');
    app.getObject('QV04', 'HRfW');
    app.getObject('QV05', 'RFCZ');
    app.getObject('QV06', 'nmpdB');
    app.getObject('QV07', 'BAgaLz');
    app.getObject('QV08', '1557b00e-5c54-41a4-a620-2be10ac4a3dd');
    app.getObject('QV09', '962c4cdc-2836-419d-b757-e4552f638aa9');
    app.getObject('QV10', '962c4cdc-2836-419d-b757-e4552f638aa9');

    $("#ClearAll").click(function () {
        app.clearAll();
    });
    $(window).bind('unload', function () {
        console.log('reloadbutton');
        app.doReload();
        app.doSave();
        console.log('saved');
    })
    $(window).click(function () {
        console.log('reloadbutton');
        app.doReload();
        app.doSave();
        console.log('saved');
    })

});
