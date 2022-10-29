import { Input } from '../../common-components';
import { apiUrls } from '../../common-components/apiUrls';
import { INPUT_VIEWS } from '../../common-components/components/input/input';
import { avatarsPath } from '../../common-components/constants';
import { User } from '../../common-components/typings';
import { HTTPTransport } from '../../common-components/utils/helpers';
import { Store } from '../../common-components/utils/helpers/Store';
import { ProfileInfo } from '../modules/profile-info/profile-info';

const store = new Store();

const getInputs = (userInfo: User) => {
    return [
        {
            descr: 'Почта',
            type: 'email',
            name: 'email',
            disabled: true,
            value: userInfo.email,
        },
        {
            descr: 'Логин',
            type: 'text',
            name: 'login',
            disabled: true,
            value: userInfo.login,
        },
        {
            descr: 'Имя',
            type: 'text',
            name: 'first_name',
            disabled: true,
            value: userInfo.first_name,
        },
        {
            descr: 'Фамилия',
            type: 'text',
            name: 'second_name',
            disabled: true,
            value: userInfo.second_name,
        },
        {
            descr: 'Имя в чате',
            type: 'text',
            name: 'display_name',
            disabled: true,
            value: userInfo.display_name,
        },
        {
            descr: 'Телефон',
            type: 'tel',
            name: 'phone',
            disabled: true,
            value: userInfo.phone,
        },
    ].map((inputParams) => {
        return new Input({
            ...inputParams,
            view: INPUT_VIEWS.TWO_SIDED,
        });
    });
};

class Profile extends ProfileInfo {
    static __instance: Profile;
    static shouldUpdate: boolean = false;

    public constructor() {
        if (Profile.__instance) {
            if (Profile.shouldUpdate) {
                Profile.updateComponent();
            }
            return Profile.__instance;
        }

        super({ inputs: [], name: '', isEditable: false });

        Profile.__instance = this;

        Profile.updateComponent();
    }

    static fetchData = async () => {
        try {
            return await HTTPTransport.get({ url: apiUrls.getUser });
        } catch (error) {
            console.error(error);
        }
    };

    static updateComponent = () => {
        Profile.fetchData()
            .then((response: string) => {
                const userInfo: User = JSON.parse(response as string) as User;

                store.set('userInfo', userInfo);

                Profile.__instance.setProps({
                    inputs: getInputs(userInfo),
                    name: userInfo.display_name,
                });

                Profile.components.avatar?.setProps({
                    imgSrc: `${avatarsPath}${userInfo.avatar}`,
                });

                Profile.shouldUpdate = false;
            })
            .catch((error) => {
                console.error(error);
            });
    };
}

export default Profile;
