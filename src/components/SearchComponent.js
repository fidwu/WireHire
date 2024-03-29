import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Row, Col } from 'reactstrap';
import '../jobs.scss';

const Search = ({keywordInput, keywordInputChanged, handleSearch, locationInput, locationInputChanged}) => {

    return (
        <Row className="search">
            <h2 className="m-auto">Easily Search and Apply</h2>
            <Form inline className="w-100 mt-3 center-block">
                <Col>
                    <FormGroup className="justify-content-center">
                        <Label for="search" className="pr-3 pb-2 labelTitle">Search</Label>
                        <Input type="text" name="search" id="search" placeholder="Keywords" className="mr-2 mb-2 mb-lg-0" value={keywordInput} onChange={keywordInputChanged} />
                        <Input type="text" name="search" id="search" placeholder="City, State" className="mr-2 mb-2 mb-lg-0" value={locationInput} onChange={locationInputChanged} />
                        <Button type="submit" className="mb-2 mb-lg-0" onClick={e => handleSearch(e)}>Search</Button>
                    </FormGroup>
                </Col>
                {/* <Col sm="12" lg="4">
                    <Label for="radioOption" className="pl-2 pb-2 labelTitle">Sort</Label>
                    <FormGroup className="justify-content-center">
                        <CustomInput type="radio" defaultChecked='true' id="relevance" name="radioOption" value="relevance" label="Relevance" inline className="m-0 p-0" onClick={handleSort} />
                        <CustomInput type="radio" id="date" name="radioOption" value="date" label="Date" inline className="m-0 p-0 ml-2" onClick={handleSort} />
                    </FormGroup>
                </Col> */}
            </Form>
        </Row>
    )
}

export default Search;