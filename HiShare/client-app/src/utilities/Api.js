import axios from 'axios';



class Api {
    static apiUrl = process.env.REACT_APP_API_URL === undefined || process.env.REACT_APP_API_URL === null ? process.env.PUBLIC_URL : process.env.REACT_APP_API_URL;
    static imageUploadUrl = "https://sm.ms/api/upload?inajax=1";

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
    static _MS_PER_HOUR = 1000 * 60 * 60;
    static _MS_PER_MIN = 1000 * 60;

    static dateDiffInDays(a, b) {
        let difference = b - a;

        let result = {
            days : Math.floor(difference / this._MS_PER_DAY)
        };

        result.hours = Math.floor((difference - result.days * this._MS_PER_DAY) / this._MS_PER_HOUR);
        result.minutes = Math.floor((difference - result.days * this._MS_PER_DAY - result.hours * this._MS_PER_HOUR) / this._MS_PER_MIN);

        return result;
    }

    static durationFromNowString(date) {
        let result = this.dateDiffInDays(date, new Date());

        if (result.days < 0) {
            return "现在";
        } else if (result.days) {
            return `${result.days}日前`;
        } else if(result.hours) {
            return `${result.hours}小时前`;
        } else if(result.minutes) {
            return `${result.minutes}分钟前`;
        } else {
            return "现在";
        }
    }

    static async UploadImageByFile(file) {

        const data = new FormData();

        data.append("smfile", file);

        let response = await fetch("https://sm.ms/api/upload?inajax=1", {
            method: 'POST',
            mode: 'cors',
            body: data
        });

        let json = await response.json();

        if (!json.error){
            return {
                success: 1,
                file: {
                    url: json.data.url
                }
            }
        } else {
            return {
                success: 0
            }
        }
    }

    static async UploadImageByUrl(url) {
        return {
            success: 1,
            file: {
                url: url
            }
        }
    }

}

export default Api;