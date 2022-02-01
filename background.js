chrome.runtime.onMessage.addListener((message,sender)=>{

    if(message.type === "switch_tab_click"){
       console.log(message.tab)
       let tab= message.tab
        chrome.tabs.highlight({tabs:tab.index,windowId:tab.windowId})
    }

})

chrome.browserAction.onClicked.addListener(function(browserAction) {
    let screenSize = parseInt(screen.width-screen.width*0.2);
    let isOpen = chrome.windows.getAll((windows)=>{
        console.log('main window',windows)
        if(windows.length == 1){
            chrome.windows.create({type:"popup",setSelfAsOpener:true ,url:'popup.html',width:parseInt(400),height:windows[0].height,left:screen.width} ,(window)=>{
                console.log('inside the callback')
                console.log("created tab",window)
                // chrome.windows.update(windows[0].id,{width:screenSize,state:"normal"},(res)=>{
                //     console.log('res after change',res)
                // })
            })
        }else{
            
        }
    })
});

