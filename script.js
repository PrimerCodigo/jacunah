const promtInput = document.getElementById('promtInput');
const terminal = document.getElementById('terminal');
const terminalWindow = document.getElementById('terminalWindow');
const date = document.getElementById('date');
let commandHistory = [':)'];
let commandIndex = -1;

promtInput.focus();
date.innerText = new Date().toDateString()
terminalWindow.addEventListener('click', () => promtInput.focus());

promtInput.addEventListener('keydown', (event) => {
  if (event.key === "Enter") {
    enterCommand(event);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    if (commandIndex < commandHistory.length - 1) {
      commandIndex++;
      promtInput.value = commandHistory[commandIndex];
    } else {
      commandIndex = commandHistory.length - 1;
      promtInput.value = commandHistory[commandIndex];
    }
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    if (commandIndex > 0) {
      commandIndex--;
      promtInput.value = commandHistory[commandIndex];
    } else {
      commandIndex = -1;
      promtInput.value = '';
    }
  }
});

const enterCommand = (event) => {
  const promtElement = document.getElementById('promptClone').cloneNode(true);
  promtElement.classList.remove('hidden');
  promtElement.getElementsByClassName('promtCloneInput')[0].innerHTML = event.target.value;
  promtElement.setAttribute('id', null);
  promtElement.getElementsByClassName('promtCloneContent')[0].appendChild(selectCommandBlock(event.target.value));
  terminal.appendChild(promtElement);
  commandHistory.unshift(event.target.value);
  if (commandHistory.length > 5) {
    commandHistory.pop();
  }
  commandIndex = -1;
  promtInput.value = '';
  promtInput.scrollIntoView(false);
}

const selectCommandBlock = (command) => {
  const lowerCommand = command.toLowerCase()
  switch (lowerCommand) {
    case 'help':
    case 'about':
    case 'social':
    case 'skills':
    case 'education':
    case 'experience':
    case 'projects':
      return getCommandTemplate(lowerCommand);
    case 'clear':
      return clearCommand();
    default:
      return notFoundCommand(command);
  }
}

const getCommandTemplate = (command) => {
  const element = document.getElementById(command).cloneNode(true);
  element.classList.remove('hidden');
  element.setAttribute('id', null);
  return element;
}

const clearCommand = () => {
  terminal.innerHTML = '';
  const element = document.createElement('span');
  return element;
}

const notFoundCommand = (command) => {
  const element = document.createElement('span');
  element.innerText = `-bash: ${command}: command not found.`;
  element.classList.add('error');
  return element;
}
