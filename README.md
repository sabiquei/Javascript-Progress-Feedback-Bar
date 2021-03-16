# Javascript-Progress-bar
Progress bar which gives a loading feedback. Implemented in javaScript.

Usage
-----

Include progresfeedback.js in application.

To start
--------
progressFeedback.start()


To stop
-------
progressFeedback.stop()

Set at a value
---------------
progressFeedback.set(value)

Options
-------
You can pass in an optional option object with following properties as an extra parameter with above methods.<br />
<h6>
  width :  initial width in number(1-100). || default - 0.<br />
  background : value for background property of css. || default - green.<br />
  classNames : Any additional classNames for the element || default - null.<br />
  target : javascript object of a div to which the element is to be inserted || if not provided element will be inserted in body.<br />
</h6>

Testing for webhooks
