const handleResponse = async (response, contentType) => {
      const content = document.querySelector('#content'); // writing to content section

      //Switch based on the response status code 
      switch (response.status) {
        case 200:
          content.innerHTML = '<b>Success!</b>';
          break;
        case 201:
          content.innerHTML = `<b>Created</b>`;
          break;
        case 400:
          content.innerHTML = `<b>Bad Request ):</b>`;
          break;
        case 404:
          content.innerHTML = `<b>Resource Not Found</b>`;
        default:
          content.innerHTML = `<b>Error code not implemented by client.</b>`;
          break;
      }


      let resObj = await response.json();

      content.innerHTML += `<p>${resObj.message}</p>`;

    };//end handleResponse

    const sendFetch = async (url) => {
      const response = await fetch(url);
      handleResponse(response);
    };


    const init = () => {
      //Grab references to drop down and button.
      //ref to the form for the submit btn
      const userForm = document.querySelector('#userForm');
      const nameForm = document.querySelector('#nameForm');

      //get users vs notReal
      const userOptions = document.querySelector('#urlField');

      //GET vs HEAD select 
      const typeOptions = document.querySelector('#methodSelect');


      const getStatus = (e) => {
        //depending on the current drop down selected, show corresponding message using sendFetch Fns
        switch (userOptions.value) {
          case '/getUsers':
            if (typeOptions.value === 'GET') {
              sendFetch('/success');
              break;
            } else {
              sendFetch('/success');
              break;
            }
          case '/notReal':
            if (typeOptions.value === 'GET') {
              sendFetch("/notFound");
              //send error Message 
              break;
            } else {
              sendFetch('/notFound');
              //no error message
              break;
            }
          default:
            sendFetch("/notFound");
            break;
        }//end switch

      }//end getStatus

      //when the button is clicked, go to getStatus fns
      //userForm.addEventListener('submit', (getStatus));
    };

    window.onload = init;

/*const handleResponse = async (response) => {
    const content = document.getElementById('content');

    switch(response.status) {
      case 200:
        content.innerHTML = `<b>Success</b>`;
        break;
      case 400:
        content.innerHTML = `<b>Bad Request</b>`;
        break;
      case 404:
        content.innerHTML = `<b>Not Found</b>`;
        break;
      default:
        content.innerHTML = `<p>Status Code not Implemented By Client</p>`;
        break;
    }

    const resObj = await response.json();
    content.innerHTML += `<p>${resObj.message}</p>`;
};

const sendFetch = async (url) => {
    const response = await fetch(url);
    handleResponse(response);
};

const init = () => {
    const successButton = document.querySelector("#success");
    const badRequestButton = document.querySelector("#badRequest");
    const notFoundButton = document.querySelector("#notFound");

    const success = () => sendFetch('/success');
    const badRequest = () => sendFetch('/badRequest');
    const notFound = () => sendFetch('/somethingUnhandled');

    successButton.addEventListener('click', success);
    badRequestButton.addEventListener('click', badRequest);
    notFoundButton.addEventListener('click', notFound);

    test.print();

    const arr = [1, 2, 3, 4, 5];
    const chunked = _.chunk(arr, 3);
    console.log(chunked);
};*/