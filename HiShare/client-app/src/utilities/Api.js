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

    static _MS_PER_DAY = 1000 * 60 * 60 * 24;

    static dateDiffInDays(a, b) {

        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / this._MS_PER_DAY);
    }

}

export default Api;