// This file is used to set the base url for the api

import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost:3500'
})
