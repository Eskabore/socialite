import  ProfilePic from './ProfilePic';
import BioEditor from './BioEditor';

export default function Profile(props) {


    return (
        <div>
            <div className='profile'>
                <ProfilePic
                    first={props.first}
                    last={ props.last }
                    picture={ props.picture }
                    toggleUploader={ props.toggleUploader }
                    size="large"
                />

                <div className="user-info">
                    <h4>

                      Name:  { props.first } <br /> Last Name: { props.last }
                    </h4>
                    <BioEditor bio={ props.bio } bioUpdated={ props.bioUpdated} />
                </div>
            </div>
        </div>
    );
}