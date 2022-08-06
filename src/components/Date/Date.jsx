import { Form } from "react-bootstrap";
import './Date.scss'

export default function Date(){
    return(
        <div className="Date">
            <Form.Group>
                <Form.Control 
                    type="date"
                    value="2022-07-21"/>
            </Form.Group>
        </div>
    )
}