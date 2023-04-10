import ProfilePic from "./ProfilePic";
import BioEditor from "./BioEditor";

export default function Profile({
    first,
    last,
    picture,
    toggleUploader,
    bio,
    bioUpdated,
}) {
    return (
        <div>
            <div className="profile">
                <ProfilePic
                    first={first}
                    last={last}
                    picture={picture}
                    toggleUploader={toggleUploader}
                    size="large"
                />

                <div className="user-info">
                    <h4>
                        Name: {first}
                        <br />
                        Last Name: {last}
                    </h4>
                    <BioEditor bio={bio} bioUpdated={bioUpdated} />
                </div>
            </div>
        </div>
    );
}
