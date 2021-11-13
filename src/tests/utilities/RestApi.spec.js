import fetchMock from 'fetch-mock';
import {
    getBearerToken, getGarageStatus, updateGarageState, addUserDevice, getUserChildAccounts, insertLightTask,
    toggleGarageDoor, getSumpLevels, getCurrentTemperature, addUserDeviceNode, deleteUserChildAccount, updateScheduledTasks,
    getUserPreferences, updateUserPreferences, setUserTemperature, addUserChildAccount, deleteScheduledTask, insertHvacTask,
    getLightGroups, setLightGroupState, setLightState, updateUserAccount, getRolesByUserId, getScheduledTasks, getRefreshedBearerToken
} from '../../utilities/RestApi';
import { getStore } from '../../state/GlobalState';


describe('RestApi', () => {
    const username = 'fakeUser';
    const password = 'fakepass';
    const baseUrl = 'https://www.soaringleafsolutions.com';
    // const baseUrl = 'http://localhost:5000';
    const userId = "e97febc0-fd10-11e9-8f0b-362b9e155667";
    const fakeBearerToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InVzZXJfaWQiOiJlOTdmZWJjMC1mZDEwLTExZTktOGYwYi0zNjJiOWUxNTU2NjciLCJyb2xlcyI6WyJnYXJhZ2VfZG9vciIsInNlY3VyaXR5IiwidGhlcm1vc3RhdCIsImxpZ2h0aW5nIiwic3VtcF9wdW1wIl0sImZpcnN0X25hbWUiOiJKb24iLCJsYXN0X25hbWUiOiJUZXN0ZXIifSwiZXhwIjoxNTg1OTY3MDIwfQ.AfGoDyYuMhdQh4UYsMUEFenTDxnQnKg3iMhX3RxXac4";

    beforeEach(() => {
        fetchMock.reset();
    });

    it('should make rest call to login api using auth header', async () => {
        const response = { 'bearerToken': fakeBearerToken };
        const body = { 'grant_type': 'client_credentials', 'client_id': username, 'client_secret': password };
        const options = { "method": "POST", "body": body };

        fetchMock.mock(`${baseUrl}/token`, response, options).catch(unmatchedUrl => {
            return {
                status: 400,
                body: { details: 'Bad Request' }
            };
        });

        const actual = await getBearerToken(username, password);
        expect(actual).toBeTruthy();
    });

    it('should store roles after successful login', async () => {
        const response = { 'bearerToken': fakeBearerToken };
        const body = { 'grant_type': 'client_credentials', 'client_id': username, 'client_secret': password };
        const options = { "method": "POST", "body": body };

        fetchMock.mock(`${baseUrl}/token`, response, options).catch(unmatchedUrl => {
            return { status: 400 };
        });

        await getBearerToken(username, password);
        expect(getStore().getUserRoles()).toEqual(["garage_door", "security", "thermostat", "lighting", "sump_pump"]);
    });

    describe('after successful login', () => {
        const garageId = 1;
        const bearerToken2 = 'abc123';

        it('should make rest call to get garage door state', async () => {
            const response = { 'isGarageOpen': true };
            const options = { "method": "GET", "headers": { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.mock(`${baseUrl}/garageDoor/${garageId}/user/${userId}/status`, response, options).catch(unmatchedUrl => {
                return { status: 400 };
            });

            const actual = await getGarageStatus(userId, bearerToken2, garageId);
            expect(actual.isGarageOpen).toEqual(true);
        });

        it('should make rest call to post garage door status', async () => {
            const response = { 'garageDoorOpen': false };
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': { "garageDoorOpen": false } };

            fetchMock.mock(`${baseUrl}/garageDoor/${garageId}/user/${userId}/state`, response, options).catch(unmatchedUrl => {
                return { status: 400 };
            });

            const actual = await updateGarageState(userId, bearerToken2, false, garageId);
            expect(actual.garageDoorOpen).toEqual(false);
        });

        it('should make rest call to toggle garage door state', async () => {
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } }

            fetchMock.mock(`${baseUrl}/garageDoor/${garageId}/user/${userId}/toggle`, options).catch(unmatchedUrl => {
                return { status: 400 };
            });

            const actual = await toggleGarageDoor(userId, bearerToken2, garageId);
            expect(actual.status).toEqual(200);
        });

        it('should make rest call to get current sump pump level', async () => {
            const userId = 'abc123';
            const expectedDepth = 33.3;
            const response = { 'currentDepth': expectedDepth, 'userId': userId, 'latestDate': '2019-11-12', 'averageDepth': 35.8 };
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.mock(`${baseUrl}/sumpPump/user/${userId}/depth`, response, options).catch(unmatchedUrl => {
                return { status: 400 };
            });

            const actual = await getSumpLevels(userId, bearerToken2);
            expect(actual.currentDepth).toEqual(expectedDepth);
        })

        it('should query the current thermostat temperature', async () => {
            const userId = 'abc123';
            const expectedTemp = 74.9;
            const response = { 'currentTemp': expectedTemp, 'isFahrenheit': true };
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.mock(`${baseUrl}/thermostat/temperature/${userId}`, response, options).catch(unmatchedUrl => {
                return { status: 400 };
            });

            const actual = await getCurrentTemperature(userId, bearerToken2);
            expect(actual.currentTemp).toEqual(expectedTemp);
        });

        it('should make rest call to post thermostat temperature', async () => {
            const desiredTemp = 54.9;
            const mode = "cooling";
            const isFahrenheit = true;
            const body = { 'desiredTemp': desiredTemp, 'mode': mode, 'isFahrenheit': isFahrenheit }
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': body }

            fetchMock.mock(`${baseUrl}/thermostat/temperature/${userId}`, options).catch(unmatchedUrl => {
                return { status: 400 }
            })

            const actual = await setUserTemperature(userId, bearerToken2, desiredTemp, mode, isFahrenheit)
            expect(actual.status).toEqual(200);
        });

        it('should query the user settings', async () => {
            const userId = 'abc1234';
            const expectedUnit = 'imperial';
            const response = { 'unit': expectedUnit, 'city': 'Des Moines', 'is_fahrenheit': true };
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.mock(`${baseUrl}/userId/${userId}/preferences`, response, options).catch(unmatchedUrl => {
                return { status: 400 };
            });

            const actual = await getUserPreferences(userId, bearerToken2);
            expect(actual.unit).toEqual(expectedUnit);
        });

        it('should make rest call to post user preferences', async () => {
            const userId = 'abc12345';
            const request = { 'isFahrenheit': true, 'isImperial': true, 'city': 'Praha', 'garageDoor': 1 }
            const options = {
                'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` },
                'body': { 'isFahrenheit': true, 'city': 'Praha', 'isImperial': false }
            }

            fetchMock.mock(`${baseUrl}/userId/${userId}/preferences/update`, options).catch(unmatchedUrl => {
                return { status: 400 };
            });

            const actual = await updateUserPreferences(userId, bearerToken2, request);

            expect(actual.status).toEqual(200);
        });

        it('should make rest call to get light groups', async () => {
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };
            const response = [{ 'groupId': 'One', 'groupName': 'Bathroom' }]

            fetchMock.mock(`${baseUrl}/lights/groups`, response, options).catch(unmatchedUrl => {
                return { status: 400 }
            });

            const actual = await getLightGroups(bearerToken2);

            expect(actual[0].groupName).toEqual('Bathroom');
        });

        it('should make rest call to set the state of a light group', async () => {
            const body = { 'groupId': 1, 'on': true, 'brightness': 224 };
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': body };

            fetchMock.mock(`${baseUrl}/lights/group/state`, options).catch(unmatchedUrl => {
                return { status: 400 }
            });

            const actual = await setLightGroupState(bearerToken2, body.groupId, body.on, body.brightness);

            expect(actual.status).toEqual(200);
        });

        it('should make rest call to set the state of a light group without brightness', async () => {
            const body = { 'groupId': 1, 'on': true };
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': body };

            fetchMock.mock(`${baseUrl}/lights/group/state`, options).catch(unmatchedUrl => {
                return { status: 400 }
            });

            const actual = await setLightGroupState(bearerToken2, body.groupId, body.on);

            expect(actual.status).toEqual(200);
        });

        it('should make rest call to set the state of an individual light', async () => {
            const body = { 'lightId': 1, 'on': true, 'brightness': 211 };
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': body };

            fetchMock.mock(`${baseUrl}/lights/group/light`, options).catch(unmatchedUrl => {
                return { status: 400 }
            });

            const actual = await setLightState(bearerToken2, body.lightId, body.on, body.brightness);

            expect(actual.status).toEqual(200);
        });

        it('should make rest call to change user password', async () => {
            const body = { 'oldPassword': 'alsoFake', 'newPassword': 'StillFake' };
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': body };

            fetchMock.mock(`${baseUrl}/account/userId/${userId}/updateAccount`, options).catch(unmatchedUrl => {
                return { status: 400 }
            });

            const actual = await updateUserAccount(userId, bearerToken2, body.oldPassword, body.newPassword);

            expect(actual.status).toEqual(200);
        });

        it('should make rest call to add device to a user', async () => {
            const body = { 'roleName': 'fakeName', 'ipAddress': '1.0.0.1' };
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': body };

            fetchMock.mock(`${baseUrl}/devices/userId/${userId}/devices`, options).catch(unmatchedUrl => {
                return { status: 400 }
            });

            const actual = await addUserDevice(userId, bearerToken2, body.roleName, body.ipAddress);

            expect(actual.status).toEqual(200);
        });

        it('should make rest call to add device node for a user', async () => {
            const deviceId = '456def';
            const body = { 'nodeName': 'fakeName', 'preferred': false };
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': body };

            fetchMock.mock(`${baseUrl}/devices/userId/${userId}/devices/${deviceId}/node`, options).catch(unmatchedUrl => {
                return { status: 400 }
            });

            const actual = await addUserDeviceNode(userId, bearerToken2, deviceId, body.nodeName, false);

            expect(actual.status).toEqual(200);
        });

        it('should make rest call to get roles with bearer token', async () => {
            const userId = 'jkasdf1';
            const response = { 'roles': [{}] };
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.mock(`${baseUrl}/account/userId/${userId}/roles`, response, options).catch(unmatchedUrl => {
                return { status: 400 }
            });

            const actual = await getRolesByUserId(userId, bearerToken2);

            expect(actual.roles).toEqual([{}]);
        });

        it('should make rest call to add child account to a user account', async () => {
            const body = { 'email': 'fakeName', 'roles': ['garage_door'] };
            const response = { 'user_name': 'test' }
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': body };

            fetchMock.mock(`${baseUrl}/account/userId/${userId}/createChildAccount`, response, options).catch(unmatchedUrl => {
                return { status: 400 }
            });

            const actual = await addUserChildAccount(userId, bearerToken2, body.email, body.roles);

            expect(actual).toEqual(response);
        });

        it('should make rest call to get child accounts for a user account', async () => {
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };
            const response = [{ 'user_name': 'test', 'roles': [] }];

            fetchMock.mock(`${baseUrl}/account/userId/${userId}/childAccounts`, response, options).catch(unmatchedUrl => {
                return { status: 400 }
            });

            const actual = await getUserChildAccounts(userId, bearerToken2);

            expect(actual[0].user_name).toEqual('test');
        });

        it('should make rest call to delete the child accounts for a user id', async () => {
            const childAccount = "abc1234";
            const options = { 'method': 'DELETE', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.mock(`${baseUrl}/account/userId/${userId}/childUserId/${childAccount}`, options).catch(unmatchedUrl => {
                return { status: 400 }
            });
            const actual = await deleteUserChildAccount(userId, bearerToken2, childAccount);

            expect(actual.status).toEqual(200);
        });

        it('should make rest call to delete the tasks for a user id', async () => {
            const taskId = "abc1234";
            const options = { 'method': 'DELETE', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.mock(`${baseUrl}/userId/${userId}/tasks/${taskId}`, options).catch(unmatchedUrl => {
                return { status: 400 }
            });
            const actual = await deleteScheduledTask(userId, bearerToken2, taskId);

            expect(actual.status).toEqual(200);
        });

        it('should make rest call to get the scheduled tasks for a user id', async () => {
            const taskId = '123lkj';
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };
            const response = [{ 'task_id': taskId, 'alarm_time': '00:00:01', 'alarm_days': 'Mon' }];

            fetchMock.mock(`${baseUrl}/userId/${userId}/tasks`, response, options).catch(unmatchedUrl => {
                return { status: 400 }
            });
            const actual = await getScheduledTasks(userId, bearerToken2);

            expect(actual[0].task_id).toEqual(taskId);
        });

        it('should make rest call to insert scheduled light tasks for a user account', async () => {
            const body = { 'alarmLightGroup': '1', 'alarmGroupName': 'potty', 'alarmDays': 'Wed', 'alarmTime': '00:23:34', 'enabled': false, 'taskType': 'off' };
            const response = [{ 'task_id': 'asdf678', 'alarm_time': '00:00:01', 'alarm_days': 'Mon' }];
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': body };

            fetchMock.mock(`${baseUrl}/userId/${userId}/tasks`, response, options).catch(unmatchedUrl => {
                return { status: 400 }
            });

            const actual = await insertLightTask(userId, bearerToken2, body.enabled, body.taskType, body.alarmLightGroup, body.alarmGroupName, body.alarmDays, body.alarmTime);

            expect(actual[0].task_id).toEqual(response[0].task_id);
        });

        it('should make rest call to insert scheduled hvac task for a user account', async () => {
            const body = { 'hvacStart': '', 'hvacStop': '', 'hvacStopTemp': '1', 'hvacStartTemp': 'potty', 'alarmDays': 'Wed', 'hvacMode': '00:23:34', 'enabled': false, 'taskType': 'off' };
            const response = [{ 'task_id': 'defg12345', 'alarm_time': '00:00:01', 'alarm_days': 'Mon' }];
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': body };

            fetchMock.mock(`${baseUrl}/userId/${userId}/tasks`, response, options).catch(unmatchedUrl => {
                return { status: 400 }
            });

            const actual = await insertHvacTask(userId, bearerToken2, body.enabled, body.taskType, body.hvacMode, body.hvacStart, body.hvacStop, body.hvacStartTemp, body.hvacStopTemp, body.alarmDays);

            expect(actual[0].task_id).toEqual(response[0].task_id);
        });

        it('should make rest call to update scheduled tasks for a user account', async () => {
            const taskId = 'asbcasd34345';
            const response = { 'task_id': taskId }
            const request = { 'taskId': 'abc', 'alarmLightGroup': '1', 'alarmGroupName': 'potty', 'alarmDays': 'Wed', 'alarmTime': '00:23:34', 'enabled': true, 'taskType': 'no' };
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': request };

            fetchMock.mock(`${baseUrl}/userId/${userId}/tasks/update`, response, options).catch(unmatchedUrl => {
                return { status: 400 }
            });

            const actual = await updateScheduledTasks(userId, bearerToken2, request);

            expect(actual.task_id).toEqual(taskId);
        });

        it('should make rest call to refresh bearer token', async () => {
            const refresh = ',jkasdfkjgasdf8673';
            const bearer = '345kh3jbk435iuy';
            const body = { 'grant_type': 'refresh_token', 'refresh_token': refresh };
            const response = { 'bearerToken': bearer };
            const options = { 'method': 'POST', 'body': body };

            fetchMock.mock(`${baseUrl}/token`, response, options).catch(unmatchedUrl => {
                return { status: 400 }
            });

            const actual = await getRefreshedBearerToken(refresh);

            expect(actual.bearerToken).toEqual(bearer);
        });
    });
});