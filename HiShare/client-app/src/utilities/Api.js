import axios from 'axios';



class Api {
    static apiUrl = process.env.REACT_APP_API_URL === undefined || process.env.REACT_APP_API_URL === null ? process.env.PUBLIC_URL : process.env.REACT_APP_API_URL;

    static async NewArticle(article, recaptchaToken) {
        return await axios.post(this.apiUrl + "/api/articles", {...article}, {
            params: {
                t : recaptchaToken
            }
        });
    }

    static async GetArticle(accessToken) {
        try {
            return await axios.get(this.apiUrl + "/api/articles/" + accessToken);
        } catch (e) {
            return null;
        }
    }
    
    static async InsertComment(comment, accessToken, recaptchaToken) {
        return await axios.post(this.apiUrl + "/api/articles/" + accessToken + "/comment", {...comment}, {
            params: {
                t: recaptchaToken
            }
        });
    }
}

export default Api;