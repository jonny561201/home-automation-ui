import React from 'react';

function UserPass() {
    return (
        <div>
            <div className="column">
                <input type="text" name="Username" placeholder="Username" />
            </div>
            <div className="column">
                <input type="password" name="Password" placeholder="Password" />
            </div>
        </div>
    )
}

export default UserPass;