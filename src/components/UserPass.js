import React from 'react';

function UserPass() {
    return (
        <form>
            <div className="column">
                <input type="text" name="Username" placeholder="Username" />
            </div>
            <div className="column">
                <input type="password" name="Password" placeholder="Password" />
            </div>
            <button className="column">Login</button>
        </form>
    )
}

export default UserPass;