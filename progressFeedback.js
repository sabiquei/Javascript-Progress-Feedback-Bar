// point to note - always pass javascript element for target - not jquery element

(function(appRef){

    var progressFeedbackBar = {
        el : null,
        width : null
    };

    var container = {
        el : null,
    };

    var incrementProgressFeedbackBar = function() {
        if (progressFeedbackBar.width <= 80) {
            progressFeedbackBar.el.style.width = toPercentage((progressFeedbackBar.width + 5).toString());
        } else if(progressFeedbackBar.width > 80 && progressFeedbackBar.width <= 88) {
            progressFeedbackBar.el.style.width = toPercentage((progressFeedbackBar.width + 1).toString());
        } else if(progressFeedbackBar.width > 88 && progressFeedbackBar.width <= 90) {
            progressFeedbackBar.el.style.width = toPercentage((progressFeedbackBar.width + 0.5).toString());
        } else if(progressFeedbackBar.width > 90 && progressFeedbackBar.width <= 98) {
            progressFeedbackBar.el.style.width = toPercentage((progressFeedbackBar.width + 0.2).toString())
        }
        else if(progressFeedbackBar.width > 98 && progressFeedbackBar.width < 99.5) {
            progressFeedbackBar.el.style.width = toPercentage((progressFeedbackBar.width + 0.02).toString());
        }
        progressFeedbackBar.width = toValue(progressFeedbackBar.el.style.width);
        //console.log(progressFeedbackBar.el.style.width);
    };

    var incrementIntervalReference = null;

    var defaultOptions = {
        width : "0",
        background : "#43ad86",
        classNames : ""
    }

    function addClass(classNames) {
        if(classNames){
            var classList = classNames.split(" ");
            classList.forEach(function(className) {
                progressFeedbackBar.el.classList.add(className);
            });
        }
    }

    function toPercentage(value) {
        return value.toString() + '%';
    }

    function toValue(percentage) {
        return parseFloat(percentage.toString().replace('%',''));
    }

    function setOptions(options) {
        options.width = options.width !== null && options.width !== undefined ? options.width :  defaultOptions.width;
        options.background = options.background !== null && options.background !== undefined ? options.background  :  defaultOptions.background;
        options.classNames = options.classNames !== null && options.classNames !== undefined ? options.classNames  :  defaultOptions.classNames;
        return options;
    }

    function createElement(options) {
        destroyElement();
        progressFeedbackBar.el = document.createElement('div');
        progressFeedbackBar.width = options.width;
        container.el = document.createElement('div');
        var containerCssString = 'width : 100%;height:3px;z-index:9999;top:0;transition: height 0.5s';
        container.el.style.cssText = containerCssString;
        var progressFeedbackBarCssString = 'width:'+options.width+';height:100%;transition:width 0.3s;background:'+options.background+';border-radius: 0 3px 3px 0';
        progressFeedbackBar.el.style.cssText = progressFeedbackBarCssString;
        addClass(options.classNames);
        container.el.appendChild(progressFeedbackBar.el);
        if(options.target) {
            container.el.style.position = 'relative';
            options.target.insertBefore(container.el, options.target.firstChild);
        } else {
            container.el.style.position = 'fixed';
            document.getElementsByTagName('body')[0].appendChild(container.el);
        }
    }

    function destroyElement() {
        if(container.el !== null && container.el != undefined){
            clearInterval(incrementIntervalReference);
            container.el.parentNode.removeChild(container.el);
            container.el = null;
            progressFeedbackBar.el = null;
        }
    }

    //-- options --
    // width :  initial width in number(1-100). || default - 0
    // background : value for background property of css. || default - green
    // classNames : Any additional classNames for the element || default - null
    // target : javascript object of a div to which the element is to be inserted || if not provided element will be inserted in body
    // -- options --
    function ProgressFeedback(options) {
        options = options || defaultOptions;
        options = setOptions(options);
        var barContainer = {
            // provide updated options if needed - starts the progress bar
             start : function(updatedOptions) {
                updatedOptions = updatedOptions || options;
                updatedOptions = setOptions(updatedOptions);
                createElement(updatedOptions);
                incrementIntervalReference = setInterval(incrementProgressFeedbackBar, 100);
             },
             // stops and removes the element from dom
            stop : function() {
                if(container.el){
                    progressFeedbackBar.el.style.width = "100%";
                    progressFeedbackBar.width = 100;
                    container.el.style.height = "0px";
                }
                setTimeout(function() {
                   destroyElement();
                }, 300);
            },
            // set the bar at a value
            set : function(value, updatedOptions) {
                if(value) {
                    updatedOptions = updatedOptions || options;
                    updatedOptions = setOptions(updatedOptions);
                    createElement(updatedOptions);
                    if(progressFeedbackBar.el) {
                        progressFeedbackBar.el.style.width = value + "%";
                        progressFeedbackBar.width = value;
                    }
                }
            }
        };
        return barContainer;
    }

    appRef.progressFeedback = new ProgressFeedback();

})(this);

// Test code
// function testCode() {
//     var options = {
//         target : document.getElementById("testIdApplication"),
//         background : "red"
//     };
// }
