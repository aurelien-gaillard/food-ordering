import React, { useContext, useEffect, useState } from 'react'
// create auth context with default value

// set backup default for isAuthenticated if none is provided in Provider
const UserContext = React.createContext({ isAuthenticated: false })
export default UserContext
