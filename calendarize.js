/* Author: Jim Camut */

function Event(event_name, event_type, event_notes, event_start_date, event_end_date, event_color){
	this.event_name = event_name;
	this.event_type = event_type;
	this.event_notes = event_notes;
	this.event_start_date = event_start_date;
	this.event_end_date = event_end_date;
	this.event_color = event_color;
}
function Initialize(){

	var start_test_date1 = new Date("2019-07-29");
	var end_test_date1 = new Date("2019-08-20");
	var test = new Event("Test event", "Work", "Why does this thing disappear?", start_test_date1, end_test_date1, "green");
	var start_test_date2 = new Date("2019-01-06");
	var end_test_date2 = new Date("2019-01-20");
	var test2 = new Event("Test event 22222", "Home", "blasbdasbflaskdfbsdjbfdf", start_test_date2, end_test_date2, "blue");
	var all_events = [test, test2];
	return all_events;
}

var g_test = Initialize();


function Calendarize() {
	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

	return {

		// Return the days in a month - given a year and the month number
		getDaysInMonth: function(month, year) {
			var date = new Date(year, month, 1);
			var days = [];
			while (date.getMonth() === month) {
				days.push(new Date(date));
				date.setDate(date.getDate() + 1);
			}
			return days;
		},

		// return an array of the first day of each month for a given year
		getMonthsInYear: function(year) {
			var date = new Date(year, 0, 1);
			var months = [];
			var monthCount = 0;
			while (monthCount < 12) {
				months.push(new Date(date));
				date.setMonth(date.getMonth() + 1);
				monthCount++;
			}
			return months;
		},

		getMonthsInRange: function(startDate, endDate) {
			var start = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
			var end = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
			var months = [];
			var monthCount = 0;
			while (start <= end) {
				months.push( new Date(start) );
				start.setMonth(start.getMonth() + 1);
				monthCount++;
			}
			return months;
		},

		// Create a full 12-month calendar
		buildYearCalendar: function(el, year) {
			var _this = this;
			var months = _this.getMonthsInYear(year);

			var opts = {
				showMonth: true,
				showDaysOfWeek: true,
				showYear: true,
				clickHandler: function(e) {
					var day = e.target.getAttribute("data-date");
					//alert(day);
				}
			};

			months.forEach(function(a, b) {
				var $monthNode = _this.buildMonth(b, year, opts);
				el.appendChild($monthNode);
			});
		},

		buildMonthsInRange: function(el, opts, startDate, limit) {
			var _this = this;
			var endDate = new Date( new Date().setDate(startDate.getDate() + limit) );
			var months = _this.getMonthsInRange(startDate, endDate);
			
			opts = opts  || {};
			opts.limitDate = endDate || false;
			if (opts.reverse) months = months.reverse();

			months.forEach(function(a, b) {
				var month = a.getMonth();
				var year = a.getFullYear();
				var $monthNode = _this.buildMonth(month, year, opts);
				el.appendChild($monthNode);
			});
		},

		// Add days and place fillers for a given month
		// This function and the one above needs consolidated
		buildMonth: function(monthNum, year, opts) {
			//if (monthNum === undefined || year === undefined) return "something is missing";
			var _this = this;
			var dtm = new Date(year, monthNum, 1);
			var dtmMonth = dtm.getMonth();
			var prevM = new Date(dtm.setMonth(dtmMonth - 1));
			var nextM = new Date(dtm.setMonth(dtmMonth + 1));
			var daysInMonth = _this.getDaysInMonth(monthNum, year);
			var daysPrevMonth = _this.getDaysInMonth(prevM.getMonth(), prevM.getFullYear());
			var daysNextMonth = _this.getDaysInMonth(nextM.getMonth(), nextM.getFullYear());
			var $monthNode = document.createElement('div');
			var $titleNode = document.createElement('h4');
			var skipLength = daysInMonth[0].getDay();
			var preLength = daysInMonth.length + skipLength;
			var postLength = function() {
				if (preLength % 7 === 0) {
					return 0;
				} else {
					if (preLength < 35) {
						return 35 - preLength;
					} else {
						return 42 - preLength;
					}
				}
			}

			$monthNode.classList.add('month');

			// Add a Title to the month
			if (opts.showMonth) {
				$titleNode.innerText = monthNames[monthNum] + (opts.showYear ? " " + year : '');
				$monthNode.appendChild($titleNode);
			}


			// Add Days of week to the top row
			if (opts.showDaysOfWeek) {
				dayNames.forEach(function(a, b) {
					var $dayNode = document.createElement('div');
					$dayNode.classList.add('dow');
					$dayNode.innerText = dayNames[b];
					$monthNode.appendChild($dayNode);
				});
			}


			// Add blank days to fill in before first day
			for (var i = 0; i < skipLength; i++) {
				var $dayNode = document.createElement('div');
				$dayNode.classList.add('dummy-day');
				$dayNode.innerText = daysPrevMonth.length - (skipLength - (i + 1));
				$monthNode.appendChild($dayNode);
			}


			// Place a day for each day of the month
			daysInMonth.forEach(function(c, d) {
				var today = new Date(new Date().setHours(0, 0, 0, 0));
				var $dayNode = document.createElement('div');
				$dayNode.classList.add('day');
				$dayNode.setAttribute("data-date", c);

				var all_days = document.getElementsByClassName("day");
				var events = g_test;
				for(i=0; i <= all_days.length-1; i++){
					var datas = new Date(all_days[i].getAttribute("data-date"));

					for(n=0; n<= events.length-1; n++){
						var dateOffset = 240;
						var f_c = events[n].event_start_date;
						var from_c = f_c.setTime(f_c.getTime() - dateOffset);
						var to_c = events[n].event_end_date;

						if(datas > from_c && datas < to_c){
							all_days[i].classList.add(events[n].event_color);
						}
					}
				}
 

				// modal function
				$dayNode.onclick = function() { 
					document.getElementById('eventModal').style.height = "100%";
					const months = ["January", "February", "March","April", "May", "June", "July", "August", "September", "October", "November", "December"];
					var data = new Date(this.getAttribute("data-date"));
					let formatted_date = data.getDate() + " " + months[data.getMonth()] + " " + data.getFullYear();
					var head = document.getElementById("header");
					var body_parag = document.getElementById("paragraphs");
					var body_text = document.getElementById("body");
    				var body_header_2 = document.getElementById("body_header2");
					head.innerHTML = formatted_date;
					var body_head = document.getElementById('body_header');
					var modal_header = document.getElementById("modal_header");
					var modal_footer = document.getElementById("modal_footer");
					

					var events = g_test;
					for(i=0; i <= events.length-1; i++){
						var dateOffset = 240;
						var f = events[i].event_start_date;
						var from = f.setTime(f.getTime() - dateOffset);
						var to = events[i].event_end_date;
						var check = data;

						if(check > from && check < to){
							body_head.innerHTML = events[i].event_name;
							body_header_2.innerHTML = events[i].event_type;
							body_text.innerHTML = events[i].event_notes;
							modal_footer.classList.add("modal_" + events[i].event_color);
							modal_header.classList.add("modal_" + events[i].event_color);
						} else{
							body_head.innerHTML = "You don't have an event this day.";
							body_parag.innerHTML = "<button class='new-event' onclick='addEvent()'>Do you want to add an event?</button>";

						}


					}

				};







				$dayNode.innerText = (d + 1);
				var dow = new Date(c).getDay();
				var dateParsed = Date.parse(c);
				var todayParsed = Date.parse(today);

				if (dateParsed === todayParsed) $dayNode.classList.add('today');
				if (dateParsed > todayParsed) $dayNode.classList.add('future');
				if (dateParsed <todayParsed) $dayNode.classList.add('past');

				if (dow === 0 || dow === 6) $dayNode.classList.add('weekend');
				if (opts.onlyCurrent && c < today) $dayNode.classList.add('dummy-day');
				if (opts.limitDate) {
					if (c > opts.limitDate) {
						$dayNode.classList.add('dummy-day');
					}
				}

				if (opts.filterDayOfWeek) {
					var valid = false;
					for (var i = 0; i < opts.filterDayOfWeek.length; i++) {
						if (c.getDay() == opts.filterDayOfWeek[i]) {
							valid = true;
						}
					}
					if (!valid) {
						$dayNode.classList.add('dummy-day');
					}
				}
				if (opts.clickHandler && !$dayNode.classList.contains('dummy-day')) {
					function handleEvent(e) {
						e = e || window.event;
						e.preventDefault();
						e.stopPropagation();
						var touches = false;
						if (!touches) {
							touches = true;
							setTimeout(function() {
								touches = false;
							}, 300);
							opts.clickHandler(e);
						}
					}
					$dayNode.addEventListener("touchstart", handleEvent);
					$dayNode.addEventListener("mousedown", handleEvent);
				}
				$monthNode.appendChild($dayNode);
			});

			// Add in the dummy filler days to make an even block
			for (var j = 0; j < postLength(); j++) {
				var $dayNode = document.createElement('div');
				$dayNode.classList.add('dummy-day');
				$dayNode.innerText = j + 1;
				$monthNode.appendChild($dayNode);
			}

			return $monthNode;

		}
	}
}


