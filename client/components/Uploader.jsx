import { Component } from "react";

export default class Uploader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
            error: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.pictureUpload = this.pictureUpload.bind(this);
    }




    pictureUpload(e) {
        e.preventDefault();

        // Using FormaData API to simpplify 'POST of file
        const formData = new FormData();

        // Input name is the first argument of `append` function !
        formData.append("file", this.state.file);

        console.log("This.ste.file: ", this.state.file);


        fetch('/picture.json', {
            method: 'POST',
            body: formData
        })
            .then((response) => {
                console.log("response.ok: ", response.ok);

                return response.json( );
            })
            .then((data) => {

                if ( data.picture == "") {
                    this.setState( { error: true });

                } else {

                    console.log("fetch '/picture' <Uploader />. this.state.file: ",
                        this.state.file,
                        "data.picture is: ", data.picture
                    );
                    this.props.uploadImage(data.picture);
                }
            });
    }

    handleChange(e) {
        this.setState ( { file: e.target.files[0] }); // event is linked to files index 0
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.error && (
                        <p>
                        Something went wrong while uploading picture!
                        </p>
                    )}
                </div>

                <div className="button" onClick={this.props.toggleUploader}>  Hello Uploader </div>

                <div>
                    <p>
                    Select a picture to upload
                    </p>
                    <form onSubmit={ this.pictureUpload }>

                        <input onChange={this.handleChange}
                            type="file"
                            name="file"
                            id="file"
                            accept="image/*"
                            placeholder="Upload"
                        />
                        <button>Upload
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}