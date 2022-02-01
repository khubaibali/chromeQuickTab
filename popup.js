chrome.tabs.onCreated.addListener(()=>{
    window.location.reload();
})
chrome.tabs.onRemoved.addListener(()=>{
    window.location.reload();
})
chrome.tabs.onUpdated.addListener((tabId,changeInfo,tab)=>{
    if(changeInfo?.url){
        window.location.reload();
    }
})

let addNewTab = document.getElementById('add-new-tab');
    addNewTab.addEventListener('click',()=>{
        chrome.tabs.create({},()=>{})
    })

let allTabs = [];
chrome.tabs.query({},(result)=>{
    allTabs=[...result];
    createTabDiv()
})

function createTabDiv(){
 
        let allTabsdiv = document.getElementById('all-tabs');
      
        allTabs.forEach((iter)=>{
            console.log(iter.favIconUrl)
            if(iter.title !== document.title){
                let url =new URL(iter.url)
                let tab = document.createElement('div');
                tab.classList.add('tab','d-flex','justify-content-between','align-items-center');
                let img = document.createElement('img');
                img.classList.add('m-3')
                img.setAttribute("src",iter.favIconUrl);
                if(iter.favIconUrl===''){
                    img.setAttribute("src","./icons/newTabicon.png")
                }
                
                img.width=20;
                img.height=20;
                let element = document.createElement('div');
                let title = document.createElement('p');
                title.classList.add('m-3')
                element.append(img,title);
                element.classList.add('d-flex')
                let crossBtn = document.createElement('button');
                crossBtn.classList.add('close','m-1');
                crossBtn.innerHTML = '<span aria-hidden="true">&times;</span>';
                crossBtn.addEventListener('click',removeTabClick.bind(event,iter));
                title.innerText=url.hostname.replace('www.',"");
                tab.append(element,crossBtn);
                allTabsdiv.append(tab);
                tab.addEventListener('click',tabClick.bind(event,iter));
            }
           
        })   
}

function tabClick(e,tab){
    chrome.runtime.sendMessage({type:"switch_tab_click",tab:e})
}
function removeTabClick(e,tab){ 
    chrome.tabs.remove(e.id,()=>{})
}
