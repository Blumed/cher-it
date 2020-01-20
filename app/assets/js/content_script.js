walk(document.body);
createAudioElement();
createConfettiContainerElement();

function walk(node) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	let child, next;

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			// xss fix
			if (node.parentElement.tagName.toLowerCase() != "script") {
				handleText(node);

            }
			break;
	}
}

function walk(node,arr,parentNode,ctr)
{
        // I stole this function from here: http://is.gd/mwZp7E
        let child, next
        if( ctr == undefined ) ctr = 0
        switch ( node.nodeType )
        {
            case 1:  // Element
            case 9:  // Document
            case 11: // Document fragment
                child = node.firstChild
                while ( child )
                {
                    ctr = ctr + 1
                    walk(child,arr,node,ctr)
                    child = child.nextSibling
                }
                break
            case 3: // Text node
                if(node.parentElement.tagName.toLowerCase() != "script") {
                    handleText(node,arr,parentNode, ctr);
                }
                break
        }
}

function handleText(textNode) 
{
	let targetText = textNode.nodeValue;

	targetText = targetText.replace(/Share/gi, "Cher");
	targetText = targetText.replace(/share/gi, "cher");

	textNode.nodeValue = targetText;
}

function createAudioElement(path) 
{
	const audioElement = document.createElement('audio');
	path = chrome.runtime.getURL('/assets/media/do-you-believe-in-love.wav');
	audioElement.setAttribute('src', path);
	audioElement.setAttribute('type', 'audio/wav');
	audioElement.id = 'cher';
	document.body.appendChild(audioElement);
}

function createConfettiContainerElement()
{
	const confettiElement = document.createElement('div');
	confettiElement.setAttribute('class', 'cher-confetti');
	document.body.appendChild(confettiElement);

	createConfettiElements();

}

function createConfettiElements() {
	const confetti = [...Array(500).keys()];
	return confetti.forEach(function(el) {
    	let div = document.createElement("div");
    	div.className = "confetti-" + el;
    	document.querySelector('.cher-confetti').appendChild(div);
	});
}

document.body.addEventListener('click', function(e) {
	let trigger = e.target.innerText;
	const toggleConfetti = document.querySelector('.cher-confetti');
	if(trigger) {
		if(trigger.includes('cher',) || trigger.includes('Cher',)) {
			trigger = true;
			document.getElementById('cher').play();
			toggleConfetti.classList.toggle('active');
			setTimeout(function(){ 
				toggleConfetti.classList.toggle('active');
			}, 4900);
		}else{
			trigger = false;
		};
	}
	//console.log(trigger, e.target.innerText);
});


