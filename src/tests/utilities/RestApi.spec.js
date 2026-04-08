import fetchMock from 'fetch-mock';
import {
    getGarageStatus, updateGarageState, addUserDevice, getUserChildAccounts, insertLightTask, getUserForecast,
    toggleGarageDoor, getSumpLevels, getCurrentTemperature, deleteUserChildAccount, updateScheduledTasks,
    getUserPreferences, updateUserPreferences, setUserTemperature, addUserChildAccount, deleteScheduledTask, insertHvacTask,
    getLightGroups, setLightGroupState, setLightState, updateUserAccount, getRolesByUserId, getScheduledTasks, getAllGarageStatus,
    getDevices
} from '../../utilities/RestApi';


describe('RestApi', () => {
    const baseUrl = 'http://localhost:5000';

    beforeEach(() => {
        fetchMock.hardReset();
        fetchMock.mockGlobal();
    });

    afterAll(() => {
        fetchMock.unmockGlobal();
    });

    describe('after successful login', () => {
        const garageId = 1;
        const bearerToken2 = 'abc123';

        it('should make rest call to get garage door state', async () => {
            const response = { 'isGarageOpen': true };
            const options = { "method": "GET", "headers": { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.route(`${baseUrl}/garageDoor/${garageId}/status`, response, options).catch(() => {
                return { status: 400 };
            });

            const actual = await getGarageStatus(bearerToken2, garageId);
            expect(actual.isGarageOpen).toEqual(true);
        });

        it('should make rest call to get all garage door states', async () => {
            const response = {doors: [{'isGarageOpen': true}]};
            const options = { "method": "GET", "headers": { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.route(`${baseUrl}/garageDoor/status`, response, options).catch(() => {
                return { status: 400 };
            });

            const actual = await getAllGarageStatus(bearerToken2);
            expect(actual).toEqual(response);
        });

        it('should make rest call to post garage door status', async () => {
            const response = { 'garageDoorOpen': false };

            fetchMock.route(`${baseUrl}/garageDoor/${garageId}/state`, response).catch(() => {
                return { status: 400 };
            });

            const actual = await updateGarageState(bearerToken2, false, garageId);
            expect(actual.garageDoorOpen).toEqual(false);
        });

        it('should make rest call to toggle garage door state', async () => {
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } }

            fetchMock.route(`${baseUrl}/garageDoor/${garageId}/toggle`, options).catch(() => {
                return { status: 400 };
            });

            const actual = await toggleGarageDoor(bearerToken2, garageId);
            expect(actual.status).toEqual(200);
        });

        it('should make rest call to get current sump pump level', async () => {
            const userId = 'abc123';
            const expectedDepth = 33.3;
            const response = { 'currentDepth': expectedDepth, 'userId': userId, 'latestDate': '2019-11-12', 'averageDepth': 35.8 };
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.route(`${baseUrl}/sumpPump/depth`, response, options).catch(() => {
                return { status: 400 };
            });

            const actual = await getSumpLevels(bearerToken2);
            expect(actual.currentDepth).toEqual(expectedDepth);
        })

        it('should query the current thermostat temperature', async () => {
            const expectedTemp = 74.9;
            const response = { 'currentTemp': expectedTemp, 'isFahrenheit': true };
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.route(`${baseUrl}/thermostat/temperature`, response, options).catch(() => {
                return { status: 400 };
            });

            const actual = await getCurrentTemperature(bearerToken2);
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

            const actual = await setUserTemperature(bearerToken2, desiredTemp, mode, isFahrenheit);
            expect(actual.status).toEqual(200);
        });

        it('should make rest call to get the forecast temperature', async () => {
            const expectedTemp = 74.9;
            const response = { 'minTemp': expectedTemp };
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.route(`${baseUrl}/thermostat/forecast`, response, options).catch(() => {
                return { status: 400 }
            })

            const actual = await getUserForecast(bearerToken2);
            expect(actual.minTemp).toEqual(expectedTemp);
        });

        it('should query the user settings', async () => {
            const expectedUnit = 'imperial';
            const response = { 'unit': expectedUnit, 'city': 'Des Moines', 'is_fahrenheit': true };
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.route(`${baseUrl}/preferences`, response, options).catch(() => {
                return { status: 400 };
            });

            const actual = await getUserPreferences(bearerToken2);
            expect(actual.unit).toEqual(expectedUnit);
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

            const actual = await updateUserPreferences(bearerToken2, request);

            expect(actual.status).toEqual(200);
        });

        it('should make rest call to get light groups', async () => {
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };
            const response = [{ 'groupId': 'One', 'groupName': 'Bathroom' }]

            fetchMock.route(`${baseUrl}/lights/groups`, response, options).catch(() => {
                return { status: 400 }
            });

            const actual = await getLightGroups(bearerToken2);

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

            const actual = await setLightGroupState(bearerToken2, body.groupId, body.on, body.brightness);

            expect(actual.status).toEqual(200);
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

            const actual = await setLightGroupState(bearerToken2, body.groupId, body.on);

            expect(actual.status).toEqual(200);
        });

        it('should make rest call to set the state of an individual light', async () => {
            const body = { 'lightId': 1, 'on': true, 'brightness': 211 };
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': body };

            fetchMock.route(`${baseUrl}/lights/group/light`, options).catch(() => {
                return { status: 400 }
            });

            const actual = await setLightState(bearerToken2, body.lightId, body.on, body.brightness);

            expect(actual.status).toEqual(200);
        });

        it('should make rest call to change user password', async () => {
            const body = { 'oldPassword': 'alsoFake', 'newPassword': 'StillFake' };
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': body };

            fetchMock.route(`${baseUrl}/account/updateAccount`, options).catch(() => {
                return { status: 400 }
            });

            const actual = await updateUserAccount(bearerToken2, body.oldPassword, body.newPassword);

            expect(actual.status).toEqual(200);
        });

        it('should make rest call to add device to a user', async () => {
            const body = { 'roleName': 'fakeName', 'ipAddress': '1.0.0.1' };
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': body };

            fetchMock.route(`${baseUrl}/devices/register`, options).catch(() => {
                return { status: 400 }
            });

            const actual = await addUserDevice(bearerToken2, body.roleName, body.ipAddress);

            expect(actual.status).toEqual(200);
        });

        it('should make rest call to get all devices bearer token', async () => {
            const response = { 'devices': [{}] };
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.route(`${baseUrl}/devices/devices`, response, options).catch(() => {
                return { status: 400 }
            });

            const actual = await getDevices(bearerToken2);

            expect(actual).toEqual(response);
        });

        //TODO: kill this method
        it('should make rest call to get roles with bearer token', async () => {
            const response = { 'roles': [{}] };
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.route(`${baseUrl}/account/roles`, response, options).catch(() => {
                return { status: 400 }
            });

            const actual = await getRolesByUserId(bearerToken2);

            expect(actual.roles).toEqual([{}]);
        });

        it('should make rest call to add child account to a user account', async () => {
            const body = { 'email': 'fakeName', 'roles': ['garage_door'] };
            const response = { 'user_name': 'test' }
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': body };

            fetchMock.route(`${baseUrl}/account/createChildAccount`, response, options).catch(() => {
                return { status: 400 }
            });

            const actual = await addUserChildAccount(bearerToken2, body.email, body.roles);

            expect(actual).toEqual(response);
        });

        it('should make rest call to get child accounts for a user account', async () => {
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };
            const response = [{ 'user_name': 'test', 'roles': [] }];

            fetchMock.route(`${baseUrl}/account/childAccounts`, response, options).catch(() => {
                return { status: 400 }
            });

            const actual = await getUserChildAccounts(bearerToken2);

            expect(actual[0].user_name).toEqual('test');
        });

        it('should make rest call to delete the child accounts for a user id', async () => {
            const childAccount = "abc1234";
            const options = { 'method': 'DELETE', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.route(`${baseUrl}/account/childUserId/${childAccount}`, options).catch(() => {
                return { status: 400 }
            });
            const actual = await deleteUserChildAccount(bearerToken2, childAccount);

            expect(actual.status).toEqual(200);
        });

        it('should make rest call to delete the tasks for a user id', async () => {
            const taskId = "abc1234";
            const options = { 'method': 'DELETE', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.route(`${baseUrl}/tasks/${taskId}`, options).catch(() => {
                return { status: 400 }
            });
            const actual = await deleteScheduledTask(bearerToken2, taskId);

            expect(actual.status).toEqual(200);
        });

        it('should make rest call to get the scheduled tasks for a user id', async () => {
            const taskId = '123lkj';
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };
            const response = [{ 'task_id': taskId, 'alarm_time': '00:00:01', 'alarm_days': 'Mon' }];

            fetchMock.route(`${baseUrl}/tasks`, response, options).catch(() => {
                return { status: 400 }
            });
            const actual = await getScheduledTasks(bearerToken2);

            expect(actual[0].task_id).toEqual(taskId);
        });

        it('should make rest call to insert scheduled light tasks for a user account', async () => {
            const body = { 'alarmLightGroup': '1', 'alarmGroupName': 'potty', 'alarmDays': 'Wed', 'alarmTime': '00:23:34', 'enabled': false, 'taskType': 'off' };
            const response = [{ 'task_id': 'asdf678', 'alarm_time': '00:00:01', 'alarm_days': 'Mon' }];
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': body };

            fetchMock.route(`${baseUrl}/tasks`, response, options).catch(() => {
                return { status: 400 }
            });

            const actual = await insertLightTask(bearerToken2, body.enabled, body.taskType, body.alarmLightGroup, body.alarmGroupName, body.alarmDays, body.alarmTime);

            expect(actual[0].task_id).toEqual(response[0].task_id);
        });

        it('should make rest call to insert scheduled hvac task for a user account', async () => {
            const body = { 'hvacStart': '', 'hvacStop': '', 'hvacStopTemp': '1', 'hvacStartTemp': 'potty', 'alarmDays': 'Wed', 'hvacMode': '00:23:34', 'enabled': false, 'taskType': 'off' };
            const response = [{ 'task_id': 'defg12345', 'alarm_time': '00:00:01', 'alarm_days': 'Mon' }];
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': body };

            fetchMock.route(`${baseUrl}/tasks`, response, options).catch(() => {
                return { status: 400 }
            });

            const actual = await insertHvacTask(bearerToken2, body.enabled, body.taskType, body.hvacMode, body.hvacStart, body.hvacStop, body.hvacStartTemp, body.hvacStopTemp, body.alarmDays);

            expect(actual[0].task_id).toEqual(response[0].task_id);
        });

        it('should make rest call to update scheduled tasks for a user account', async () => {
            const taskId = 'asbcasd34345';
            const response = { 'task_id': taskId }
            const request = { 'taskId': 'abc', 'alarmLightGroup': '1', 'alarmGroupName': 'potty', 'alarmDays': 'Wed', 'alarmTime': '00:23:34', 'enabled': true, 'taskType': 'no' };

            fetchMock.route(`${baseUrl}/tasks/update`, response).catch(() => {
                return { status: 400 }
            });

            const actual = await updateScheduledTasks(bearerToken2, request);

            expect(actual.task_id).toEqual(taskId);
        });
    });
});