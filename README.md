# Mandrill Verify

Flexible jQuery form validation, no forms or form submission required.

## Version

0.2

## Requirements

jQuery >= 1.8

notify.js (will remove this requirement for built in and/or customizable error handling)

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

| Type          | Description                                         | Assignment                          |
|---------------|-----------------------------------------------------|-------------------------------------|
| required      | Must enter a value. If not added assumed optional.  |data-verify="required"               |
| email         | Standard email address.                             |data-verify="email"                  |
| number        | Integer or floating point value.                    |data-verify="number"                 |
| integer       | Signed integer value.                               |data-verify="integer"                |
| digits        | Unsigned integer value.                             |data-verify="digits"                 |
| trim          | Ignore trailing or leading whitespace.              |data-verify="trim"                   |
| url           | Standard urls. No IP or Ports supported.            |data-verify="url"                    |
| alphanumeric  | Alphanumeric values only (ex. "abc123").            |data-verify="alphanumeric"           |
| max           | Maximum characters allowed in input.                |data-verify="max:10"                 |
| min           | Minimum characters allowed in input.                |data-verify="min:32"                 |
| multiple types| You can put many different types on a field         |data-verify="required, email, max:32"|


## License

Released under the MIT License. See `LICENSE` file for details.
