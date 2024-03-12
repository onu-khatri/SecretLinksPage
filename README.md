# SecretLinksPage
A web-page to store your secret web-links on local system

# How to use page:
- index.html: `const owner = "YW51c--"`; { get owner-id by javascript code in browser-console: `btoa('your-secret-text')`  and update owner value in index.html }
- Add url to input-box on the page, and click on the save button.
- provide name, root, and generic option in model-form.
- click on 'Copy latest data' button
- paste data in data.js file. data = {copied text}
- To see the decrypted list, reload the page with queryString 'btoa=1' and type your secret-text in input-box.

# Page-Sample:

![image](https://github.com/onu-khatri/SecretLinksPage/assets/85816412/c3230540-3b6d-49c0-bf18-12c0eb12ea7a)

# Add an encrypted link to data in localStorage of system:

![image](https://github.com/onu-khatri/SecretLinksPage/assets/85816412/d0d548a2-28fd-4f35-9803-131c7f8097da)
