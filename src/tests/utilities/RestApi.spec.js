import fetchMock from 'fetch-mock';
import {
    initRestApi,
    updateGarageState, getUserChildAccounts, insertLightTask, getUserForecast,
    toggleGarageDoor, getSumpLevels, getCurrentTemperature, deleteUserChildAccount, updateScheduledTasks,
    getUserPreferences, updateUserPreferences, setUserTemperature, addUserChildAccount, deleteScheduledTask, insertHvacTask,
    getLightGroups, setLightGroupState, setLightState, getScheduledTasks, getAllGarageStatus,
    getDevices, addUserDeviceNode, reverseGeocode, getExtendedForecast,
    subscribeToPushNotifications, unsubscribeFromPushNotifications, getVapidPublicKey
} from '../../utilities/RestApi';


describe('RestApi', () => {
    const baseUrl = 'http://localhost:5000';
    const bearerToken2 = 'abc123';

    beforeEach(() => {
        fetchMock.hardReset();
        fetchMock.mockGlobal();
        initRestApi({ getAccessTokenSilently: () => Promise.resolve(bearerToken2) });
    });

    afterAll(() => {
        fetchMock.unmockGlobal();
    });

    describe('after successful login', () => {
        const garageId = 1;

        it('should make rest call to get all garage door states', async () => {
            const response = {doors: [{'isGarageOpen': true}]};
            const options = { "method": "GET", "headers": { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.route(`${baseUrl}/garageDoor/status`, response, options).catch(() => {
                return { status: 400 };
            });

            const actual = await getAllGarageStatus();
            expect(actual).toEqual(response);
        });

        it('should make rest call to post garage door status', async () => {
            const response = { 'garageDoorOpen': false };

            fetchMock.route(`${baseUrl}/garageDoor/${garageId}/state`, response).catch(() => {
                return { status: 400 };
            });

            const actual = await updateGarageState(false, garageId);
            expect(actual.garageDoorOpen).toEqual(false);
        });

        it('should make rest call to toggle garage door state', async () => {
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } }

            fetchMock.route(`${baseUrl}/garageDoor/${garageId}/toggle`, options).catch(() => {
                return { status: 400 };
            });

            const actual = await toggleGarageDoor(garageId);
            expect(actual.ok).toBe(true);
        });

        it('should make rest call to get current sump pump level', async () => {
            const userId = 'abc123';
            const expectedDepth = 33.3;
            const response = { 'currentDepth': expectedDepth, 'userId': userId, 'latestDate': '2019-11-12', 'averageDepth': 35.8 };
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.route(`${baseUrl}/sumpPump/depth`, response, options).catch(() => {
                return { status: 400 };
            });

            const actual = await getSumpLevels();
            expect(actual.currentDepth).toEqual(expectedDepth);
        })

        it('should query the current thermostat temperature', async () => {
            const expectedTemp = 74.9;
            const response = { 'currentTemp': expectedTemp, 'isFahrenheit': true };
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.route(`${baseUrl}/thermostat/temperature`, response, options).catch(() => {
                return { status: 400 };
            });

            const actual = await getCurrentTemperature();
            expect(actual.currentTemp).toEqual(expectedTemp);
        });

        it('should make rest call to post thermostat temperature', async () => {
            const desiredTemp = 54.9;
            const mode = "cooling";
            const isFahrenheit = true;
            const body = { 'desiredTemp': desiredTemp, 'mode': mode, 'isFahrenheit': isFahrenheit };
            const options = {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${bearerToken2}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            };

            fetchMock.route(`${baseUrl}/thermostat/temperature/desired`, options).catch(() => {
                return { status: 400 }
            })

            const actual = await setUserTemperature(desiredTemp, mode, isFahrenheit);
            expect(actual.ok).toBe(true);
        });

        it('should make rest call to get the forecast temperature', async () => {
            const expectedTemp = 74.9;
            const response = { 'minTemp': expectedTemp };
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.route(`${baseUrl}/thermostat/forecast`, response, options).catch(() => {
                return { status: 400 }
            })

            const actual = await getUserForecast();
            expect(actual.minTemp).toEqual(expectedTemp);
        });

        it('should query the user settings', async () => {
            const expectedUnit = 'imperial';
            const response = { 'unit': expectedUnit, 'city': 'Des Moines', 'is_fahrenheit': true };
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.route(`${baseUrl}/preferences`, response, options).catch(() => {
                return { status: 400 };
            });

            const actual = await getUserPreferences();
            expect(actual.unit).toEqual(expectedUnit);
        });

        it('should make rest call to get extended forecast', async () => {
            const response = {
                forecast: [
                    { date: '2026-05-06', minTemp: 55, maxTemp: 72, description: 'sunny' },
                    { date: '2026-05-07', minTemp: 58, maxTemp: 70, description: 'partly cloudy' },
                ],
            };
            const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.route(`${baseUrl}/thermostat/forecast/extended`, response, options).catch(() => {
                return { status: 400 };
            });

            const actual = await getExtendedForecast();
            expect(actual).toEqual(response);
        });

        it('should return empty object when extended forecast response is not ok', async () => {
            fetchMock.route(`${baseUrl}/thermostat/forecast/extended`, { status: 500 });

            const actual = await getExtendedForecast();
            expect(actual).toEqual({});
        });

        it('should make rest call to reverse geocode coordinates', async () => {
            const response = { city: 'Mingo', state: 'IA' };
            const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.route(`${baseUrl}/geocode/reverse?latitude=41.77&longitude=-93.27`, response, options).catch(() => {
                return { status: 400 };
            });

            const actual = await reverseGeocode(41.77, -93.27);
            expect(actual).toEqual(response);
        });

        it('should return empty object when reverse geocode response is not ok', async () => {
            fetchMock.route(`${baseUrl}/geocode/reverse?latitude=0&longitude=0`, { status: 404 });

            const actual = await reverseGeocode(0, 0);
            expect(actual).toEqual({});
        });

        it('should make rest call to post user preferences', async () => {
            const request = { 'isFahrenheit': true, 'isImperial': true, 'city': 'Praha', 'garageDoor': 1 }
            const options = {
                'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` },
                'body': { 'isFahrenheit': true, 'city': 'Praha', 'isImperial': false }
            }

            fetchMock.route(`${baseUrl}/preferences/update`, options).catch(() => {
                return { status: 400 };
            });

            const actual = await updateUserPreferences(request);

            expect(actual.ok).toBe(true);
        });

        it('should make rest call to get light groups', async () => {
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };
            const response = [{ 'groupId': 'One', 'groupName': 'Bathroom' }]

            fetchMock.route(`${baseUrl}/lights/groups`, response, options).catch(() => {
                return { status: 400 }
            });

            const actual = await getLightGroups();

            expect(actual[0].groupName).toEqual('Bathroom');
        });

        it('should make rest call to set the state of a light group', async () => {
            const body = { 'groupId': 1, 'on': true, 'brightness': 224 };
            const options = {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${bearerToken2}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            };

            fetchMock.route(`${baseUrl}/lights/group/state`, options).catch(() => {
                return { status: 400 }
            });

            const actual = await setLightGroupState(body.groupId, body.on, body.brightness);

            expect(actual.ok).toBe(true);
        });

        it('should make rest call to set the state of a light group without brightness', async () => {
            const body = { 'groupId': 1, 'on': true };
            const options = {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${bearerToken2}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            };

            fetchMock.route(`${baseUrl}/lights/group/state`, options).catch(() => {
                return { status: 400 }
            });

            const actual = await setLightGroupState(body.groupId, body.on);

            expect(actual.ok).toBe(true);
        });

        it('should make rest call to set the state of an individual light', async () => {
            const body = { 'lightId': 1, 'on': true, 'brightness': 211 };
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': body };

            fetchMock.route(`${baseUrl}/lights/group/light`, options).catch(() => {
                return { status: 400 }
            });

            const actual = await setLightState(body.lightId, body.on, body.brightness);

            expect(actual.ok).toBe(true);
        });

        it('should make rest call to get all devices bearer token', async () => {
            const response = { 'devices': [{}] };
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.route(`${baseUrl}/devices/devices`, response, options).catch(() => {
                return { status: 400 }
            });

            const actual = await getDevices();

            expect(actual).toEqual(response);
        });

        it('should make rest call to add device node', async () => {
            const deviceId = 5;
            const nodes = [{ nodeDevice: 1, nodeName: 'Main Door', preferred: true }];
            const body = { 'nodes': nodes };
            const response = { 'ok': true };
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}`, 'Content-Type': 'application/json' }, 'body': body };

            fetchMock.route(`${baseUrl}/devices/${deviceId}/node`, response, options).catch(() => {
                return { status: 400 }
            });

            const actual = await addUserDeviceNode(deviceId, nodes);

            expect(actual.ok).toBe(true);
        });

        it('should make rest call to fetch the VAPID public key', async () => {
            fetchMock.route(`${baseUrl}/notifications/vapid-key`, { publicKey: 'B-vapid-key' }).catch(() => {
                return { status: 400 }
            });

            const actual = await getVapidPublicKey();

            expect(actual).toEqual('B-vapid-key');
        });

        it('should make rest call to subscribe to push notifications', async () => {
            const subscription = {
                endpoint: 'https://fcm.googleapis.com/fcm/send/abc123',
                keys: { p256dh: 'pubKey', auth: 'authSecret' }
            };

            fetchMock.route(`${baseUrl}/notifications/subscribe`, { ok: true }).catch(() => {
                return { status: 400 }
            });

            const actual = await subscribeToPushNotifications(subscription);

            expect(actual.ok).toBe(true);
        });

        it('should make rest call to unsubscribe from push notifications', async () => {
            const endpoint = 'https://fcm.googleapis.com/fcm/send/abc123';

            fetchMock.route(`${baseUrl}/notifications/subscribe`, { ok: true }).catch(() => {
                return { status: 400 }
            });

            const actual = await unsubscribeFromPushNotifications(endpoint);

            expect(actual.ok).toBe(true);
        });

        it('should make rest call to add child account to a user account', async () => {
            const body = { 'email': 'fakeName', 'roles': ['garage_door'] };
            const response = { 'user_name': 'test' }
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': body };

            fetchMock.route(`${baseUrl}/account/createChildAccount`, response, options).catch(() => {
                return { status: 400 }
            });

            const actual = await addUserChildAccount(body.email, body.roles);

            expect(actual).toEqual(response);
        });

        it('should make rest call to get child accounts for a user account', async () => {
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };
            const response = [{ 'user_name': 'test', 'roles': [] }];

            fetchMock.route(`${baseUrl}/account/childAccounts`, response, options).catch(() => {
                return { status: 400 }
            });

            const actual = await getUserChildAccounts();

            expect(actual[0].user_name).toEqual('test');
        });

        it('should make rest call to delete the child accounts for a user id', async () => {
            const childAccount = "abc1234";
            const options = { 'method': 'DELETE', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.route(`${baseUrl}/account/childUserId/${childAccount}`, options).catch(() => {
                return { status: 400 }
            });
            const actual = await deleteUserChildAccount(childAccount);

            expect(actual.ok).toBe(true);
        });

        it('should make rest call to delete the tasks for a user id', async () => {
            const taskId = "abc1234";
            const options = { 'method': 'DELETE', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.route(`${baseUrl}/tasks/${taskId}`, options).catch(() => {
                return { status: 400 }
            });
            const actual = await deleteScheduledTask(taskId);

            expect(actual.ok).toBe(true);
        });

        it('should make rest call to get the scheduled tasks for a user id', async () => {
            const taskId = '123lkj';
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };
            const response = [{ 'taskId': taskId, 'alarmTime': '00:00:01', 'alarmDays': 'Mon' }];

            fetchMock.route(`${baseUrl}/tasks`, response, options).catch(() => {
                return { status: 400 }
            });
            const actual = await getScheduledTasks();

            expect(actual[0].taskId).toEqual(taskId);
        });

        it('should make rest call to insert scheduled light tasks for a user account', async () => {
            const body = { 'alarmLightGroup': '1', 'alarmGroupName': 'potty', 'alarmDays': 'Wed', 'alarmTime': '00:23:34', 'enabled': false, 'taskType': 'off' };
            const response = [{ 'taskId': 'asdf678', 'alarmTime': '00:00:01', 'alarmDays': 'Mon' }];
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': body };

            fetchMock.route(`${baseUrl}/tasks`, response, options).catch(() => {
                return { status: 400 }
            });

            const actual = await insertLightTask(body.enabled, body.taskType, body.alarmLightGroup, body.alarmGroupName, body.alarmDays, body.alarmTime);

            expect(actual[0].taskId).toEqual(response[0].taskId);
        });

        it('should make rest call to insert scheduled hvac task for a user account', async () => {
            const body = { 'hvacStart': '', 'hvacStop': '', 'hvacStopTemp': '1', 'hvacStartTemp': 'potty', 'alarmDays': 'Wed', 'hvacMode': '00:23:34', 'enabled': false, 'taskType': 'off' };
            const response = [{ 'taskId': 'defg12345', 'alarmTime': '00:00:01', 'alarmDays': 'Mon' }];
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': body };

            fetchMock.route(`${baseUrl}/tasks`, response, options).catch(() => {
                return { status: 400 }
            });

            const actual = await insertHvacTask(body.enabled, body.taskType, body.hvacMode, body.hvacStart, body.hvacStop, body.hvacStartTemp, body.hvacStopTemp, body.alarmDays);

            expect(actual[0].taskId).toEqual(response[0].taskId);
        });

        it('should make rest call to update scheduled tasks for a user account', async () => {
            const taskId = 'asbcasd34345';
            const response = { 'taskId': taskId }
            const request = { 'taskId': 'abc', 'alarmLightGroup': '1', 'alarmGroupName': 'potty', 'alarmDays': 'Wed', 'alarmTime': '00:23:34', 'enabled': true, 'taskType': 'no' };

            fetchMock.route(`${baseUrl}/tasks/update`, response).catch(() => {
                return { status: 400 }
            });

            const actual = await updateScheduledTasks(request);

            expect(actual.taskId).toEqual(taskId);
        });
    });
});
