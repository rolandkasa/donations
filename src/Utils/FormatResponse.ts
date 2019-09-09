import ResponseModel from "../Models/ResponseModel";
import FormatResponseInterface from "../Interfaces/FormatResponseInterface";

export default abstract class FormatResponse implements FormatResponseInterface{
    public static transform(responseMessage, responseStatus: number): Object{
        let response: ResponseModel;

        switch(responseStatus){
            case 200:{
                response = new ResponseModel(responseMessage,null,responseStatus)
                return response.serialize();
            }
            default: {
                response = new ResponseModel(null,responseMessage,responseStatus)
                return response.serialize();
            }
        }
    }
}