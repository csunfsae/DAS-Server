"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _db = _interopRequireDefault(require("./config/db.js"));

var _SeedData = _interopRequireDefault(require("./data/SeedData.js"));

var _morgan = _interopRequireDefault(require("morgan"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _socket = _interopRequireDefault(require("socket.io"));

var _xlsx = _interopRequireDefault(require("xlsx"));

var _users = _interopRequireDefault(require("./routes/users.js"));

var _sensors = _interopRequireDefault(require("./routes/sensors.js"));

var _sensorTypes = _interopRequireDefault(require("./routes/sensorTypes.js"));

var _sensorCategories = _interopRequireDefault(require("./routes/sensorCategories.js"));

var _subTeams = _interopRequireDefault(require("./routes/subTeams.js"));

var _driveDay = _interopRequireDefault(require("./models/driveDay.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// Load config
_dotenv["default"].config({
  path: './config/config.env'
});

(0, _db["default"])();
(0, _SeedData["default"])();
var app = (0, _express["default"])(); // Telling server to serve static files on client

var _dirname = _path["default"].resolve();

app.use(_express["default"]["static"](_path["default"].join(_dirname, 'client', 'build'))); // middleware

app.use(_express["default"].json());
app.use((0, _cookieParser["default"])());
var oneDay = 1000 * 60 * 60 * 24;
app.use((0, _expressSession["default"])({
  resave: false,
  secret: '123456',
  cookie: {
    maxAge: oneDay
  },
  saveUninitialized: true
})); // Add headers before the routes are defined

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Request methods you wish to allow

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // Request headers you wish to allow

  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)

  res.setHeader('Access-Control-Allow-Credentials', true); // Pass to next layer of middleware

  next();
}); // Logging

if (process.env.NODE_ENV === 'development') {
  app.use((0, _morgan["default"])('dev'));
}

var PORT = process.env.PORT || 5000;
var server = app.listen(PORT, console.log("Server running on port ".concat(PORT)));
var io = new _socket["default"](server);
app.use('/api/v1/auth', _users["default"]);
app.use('/sensors', _sensors["default"]);
app.use('/subTeams', _subTeams["default"]);
app.use('/sensorCategories', _sensorTypes["default"]);
app.use('/sensorTypes', _sensorCategories["default"]);
app.use((0, _cors["default"])());

var lookUpSensors = function lookUpSensors(sensorList) {
  // Getting all of the models from mongoose
  var models = _mongoose["default"].models; // List of the model representations for the sensors
  // Going to be returned so we can further query data from the db

  var sensors = []; // For each sensor in the sensorList params

  var _iterator = _createForOfIteratorHelper(sensorList),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var sensor = _step.value;

      // For each model from the models object
      for (var model in models) {
        // If the sensor equals that models collection name in the db, append it to the list of models
        if (sensor === models[model].collection.collectionName) {
          sensors.push(models[model]);
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return sensors;
};

app.get('/api/v1/data', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var dates, sessionNumbers, lapNumbers, sensors, sensorsData, sensorModels, i, date, _session, lap, j, sensorName, sensorData, sensor;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dates = req.query.dates.includes(',') ? req.query.dates.split(',') : [req.query.dates];
            sessionNumbers = req.query.session_numbers.includes(',') ? req.query.session_numbers.split(',') : [req.query.session_numbers];
            lapNumbers = req.query.lap_numbers.includes(',') ? req.query.lap_numbers.split(',') : [req.query.lap_numbers];
            sensors = req.query.sensors.includes(',') ? req.query.sensors.split(',') : [req.query.sensors]; // Object to hold all of the data from the db

            sensorsData = {}; // Array to hold the model representation from mongoose
            // Ex. ThrottlePosition

            sensorModels = lookUpSensors(sensors); // For the length of the laps array

            i = 0;

          case 7:
            if (!(i < lapNumbers.length)) {
              _context.next = 25;
              break;
            }

            // If there isn't as many dates/sessions as laps, use last index in the date/session array
            // Else, use that index of the date/session array
            date = dates[i] === undefined ? dates[dates.length - 1] : dates[i];
            _session = sessionNumbers[i] === undefined ? sessionNumbers[sessionNumbers.length - 1] : sessionNumbers[i];
            lap = lapNumbers[i] === undefined ? lapNumbers[lapNumbers.length - 1] : lapNumbers[i]; // For each sensor, get the data and append it to the sensorsData object

            j = 0;

          case 12:
            if (!(j < sensorModels.length)) {
              _context.next = 22;
              break;
            }

            sensorName = sensorModels[j].modelName;
            _context.next = 16;
            return sensorModels[j].find({
              date: date,
              sessionNumber: _session,
              lapNumber: lap
            }).select("lapTime value -_id");

          case 16:
            sensorData = _context.sent;

            if (Object.keys(sensorsData).length < sensorModels.length) {
              sensorsData[sensorName] = [];
            }

            if (Object.keys(sensorsData)[j] === sensorName) {
              sensor = Object.keys(sensorsData)[j];
              sensorsData[sensor].push(sensorData);
            }

          case 19:
            j++;
            _context.next = 12;
            break;

          case 22:
            i++;
            _context.next = 7;
            break;

          case 25:
            // Send back the data to the fontend
            // res.type('json').send(JSON.stringify(sensorsData, null, 2) + '\n');
            res.send(sensorsData);

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.get('/api/v1/drive-days', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _driveDays, dates, driveDays;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(req.query.dates === undefined)) {
              _context2.next = 5;
              break;
            }

            _context2.next = 3;
            return _driveDay["default"].findOne({}).sort({
              date: -1
            }).select("date sessions -_id");

          case 3:
            _driveDays = _context2.sent;
            res.status(200).json(_driveDays);

          case 5:
            dates = req.query.dates.includes(',') ? req.query.dates.split(',') : [req.query.dates];
            _context2.next = 8;
            return _driveDay["default"].find({
              $and: [{
                "date": {
                  $gte: dates[0]
                }
              }, {
                "date": {
                  $lte: dates[1]
                }
              }]
            }).sort({
              date: -1
            }).select("date sessions -_id");

          case 8:
            driveDays = _context2.sent;
            res.status(200).json(driveDays);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
io.on('connection', function (socket) {
  var jetsonSocketId = null;
  socket.on('jetson_connection', function (msg) {
    jetsonSocketId = socket.id;
    socket.broadcast.emit('jetson_connecti on', msg);
  });
  test(socket);
  socket.on('disconnect', function (reason) {
    var jetsonDisconnected = false;

    if (socket.id === jetsonSocketId) {
      socket.broadcast.emit('jetson_connection', "Not Connected");
    }
  });
});

function test(_x5) {
  return _test.apply(this, arguments);
}

function _test() {
  _test = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(socket) {
    var workbook, sheet_name_list, xlData, i;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            workbook = _xlsx["default"].readFile('./data/excelFiles/Copy-Simulation-Test-Data.xlsx');
            sheet_name_list = workbook.SheetNames;
            xlData = _xlsx["default"].utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
            i = 0;

          case 4:
            if (!(i < xlData.length)) {
              _context3.next = 28;
              break;
            }

            socket.emit('lap_time', xlData[i].Lap_Time);
            socket.emit('gForceChart', {
              x: -1 * xlData[i].G_G_Latitude,
              y: -1 * xlData[i].G_G_Longitude
            });
            socket.emit('gps_data', {
              x: xlData[i].GPS_Longitude,
              y: xlData[i].GPS_Latitude
            });
            socket.emit('battery_voltage', xlData[i].Battery_Voltage);
            socket.emit('fl_tire_load', xlData[i].FL_Tire_Load);
            socket.emit('fl_tire_temp', xlData[i].FL_Tire_Temp);
            socket.emit('fr_tire_load', xlData[i].FR_Tire_Load);
            socket.emit('fr_tire_temp', xlData[i].FR_Tire_Temp);
            socket.emit('rl_tire_load', xlData[i].RL_Tire_Load);
            socket.emit('rl_tire_temp', xlData[i].RL_Tire_Temp);
            socket.emit('rr_tire_load', xlData[i].RR_Tire_Load);
            socket.emit('rr_tire_temp', xlData[i].RR_Tire_Temp);
            socket.emit('brake_position', xlData[i].Brake_Position);
            socket.emit('steering_angle', xlData[i].Steering_Angle);
            socket.emit('motor_temp', xlData[i].Motor_Temp);
            socket.emit('throttle_position', xlData[i].Throttle_Position);
            socket.emit('motor_controller_air_temp', xlData[i].Motor_Controller_Air_Temp);
            socket.emit('speed', xlData[i].Speed);
            _context3.next = 25;
            return sleep(100);

          case 25:
            i++;
            _context3.next = 4;
            break;

          case 28:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _test.apply(this, arguments);
}

function sleep(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}
