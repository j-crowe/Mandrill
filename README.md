# Mandrill Verify

Flexible jQuery form validation, no forms or form submission required

## Version

0.1

## Requirements

jQuery >= 1.8

notify.js

## Install

```
install mandrill.js 
install notify.js
install jquery
```

## Test

In the browser: open `example.html`

## Example
First make sure you have all libraries included in your header.
```javascript
    <script type="text/javascript" src="jquery-2.1.1.min.js"></script>
    <script type="text/javascript" src="notify.min.js"></script>
    <script type="text/javascript" src="mandrill.js"></script>
```

On the fields you want verified, use the data-verify class followed by supported verification types(See `Supported Types`). The wrapping div allows mandrill to verify all children with data-verify class.
```javascript
  <div id="login_form" >
    <input id="login_user" type="email" data-verify="required, email" placeholder="Email" />
    <br />
    <input id="login_pass" type="password" data-verify="required" placeholder="Password" />
    <br />
  </div>
```

Set up trigger for verification and pass optional callback.
```javascript
    <a href="#" id="login_button" onclick="mandrill.verify($('#login_form'), callback_test)">Login</a>
```

Verify takes the provided parent and verifies every child with data-verify class. If an error occurs the callback will not be called and notify popup with provided error message is shown.

Takes optional callback and optional arguments
```javascript
mandrill.verify($([parent_object]), [optional callback, [optional args...]])
```

##Supported Types
* required
    * data-verify="required"
* email
    * data-verify="email"
* number
    * data-verify="number"
* url
    * data-verify="url"
* alphanumeric
    * data-verify="alphanumeric"
* max
    * data-verify="max(10)" <--- this verifies input is max 10 characters
* min
    * data-verify="min(32)" <--- this verifies input is min 32 characters

- Multiple types per field:
    - data-verify="required, email, max(32)"



## License

Released under the MIT License. See `LICENSE` file for details.
