import { React, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Link, Head } from '@inertiajs/inertia-react';
import LocalizedStrings from 'react-localization';
import stringss from "../../strings";
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import Container from '@/components/container';
import StaticsCard from "@/components/StaticsCard";
import MailIcon from "@/components/MailIcon";
import {
    EmailShareButton,
    FacebookShareButton,
    FacebookMessengerShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton
} from "react-share";
import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    HatenaIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WeiboIcon,
    WhatsappIcon,
    WorkplaceIcon
} from "react-share";
export default function Referral(props) {
    const [text, setText] = useState(props.referralUrl);
    const [copied, setcopied] = useState(false);

    const inputHandler = event => {
        setText(event.target.value);
    }

    const copy = async () => {
        await navigator.clipboard.writeText(text);
        setcopied(true);
        setTimeout(function () {
            setcopied(false);
        }, 2000);
    }

    // console.log(props.properties);
    let strings = new LocalizedStrings(stringss);
    strings.setLanguage(props.locale);
    return (
        <Authenticated
            locale={props.locale}
            auth={props.auth}
            errors={props.errors}
            header={strings.Referral}
            menu={props.menu}
            strings={strings}
        >
            <Head title={strings.Referral} />


            <Container>
                <div className='sm:w-2/3 sm:flex gap-6'>
                    <StaticsCard imgClass="sm:w-13 h-13" className="sm:w-1/2 h-28" icon={"/appIcons/referralReturn.svg"} title={strings.referralReturn} amount={props.referralReturn} currency={strings.currency} />
                    <StaticsCard imgClass="sm:w-13 h-13" className="sm:w-1/2 h-28 sm:my-0 my-4" icon={"/appIcons/referralUsers.svg"} title={strings.referralUsers} amount={props.referralUsers} />
                </div>
                <div className='sm:w-2/3 h-56 my-4 sm:p-6 p-4 rounded bg-white fav-shadow'>

                    <Label forInput="url" value={strings.referralUrl} />
                    <div className='flex w-full gap-2.5'>
                        <Input
                            type="url"
                            name="url"
                            value={props.referralUrl}
                            className="mt-1 block w-3/4 pointer-events-none text-l-gray dir-ltr"
                            handleChange={inputHandler}

                        // disabled
                        />
                        <Button onClick={copy} className="w-1/4 flex justify-center gap-2.5 text-white"><img src="/appIcons/copy.svg" /> {strings.copy}</Button>

                    </div>
                    <p className={`${copied ? "opacity-100" : "opacity-0"} text-base text-l-gray`}>{strings.copied}</p>
                    <p className='text-d-blue text-base sm:hidden block'>{strings.shareLink}</p>
                    <div className='flex my-4 sm:gap-8 gap-2.5'>
                        <p className='text-d-blue text-base hidden sm:block'>{strings.shareLink}</p>
                        <EmailShareButton url={props.referralUrl}><MailIcon /></EmailShareButton>
                        <FacebookShareButton url={props.referralUrl}><FacebookIcon size={24} round={true} /></FacebookShareButton>
                        <FacebookMessengerShareButton url={props.referralUrl} appId={""}><FacebookMessengerIcon size={24} round={true} /></FacebookMessengerShareButton>
                        {/* <HatenaShareButton url={props.referralUrl}><HatenaIcon size={24} round={true} /></HatenaShareButton> */}
                        {/* <InstapaperShareButton url={props.referralUrl}><InstapaperIcon size={24} round={true} /></InstapaperShareButton> */}
                        {/* <LineShareButton url={props.referralUrl}><LineIcon size={24} round={true} /></LineShareButton> */}
                        <LinkedinShareButton url={props.referralUrl}><LinkedinIcon size={24} round={true} /></LinkedinShareButton>
                        {/* <LivejournalShareButton url={props.referralUrl}><LivejournalIcon size={24} round={true} /></LivejournalShareButton> */}
                        {/* <MailruShareButton url={props.referralUrl}><MailruIcon size={24} round={true} /></MailruShareButton> */}
                        {/* <OKShareButton url={props.referralUrl}><OKIcon size={24} round={true} /></OKShareButton> */}
                        {/* <PocketShareButton url={props.referralUrl}><PocketIcon size={24} round={true} /></PocketShareButton> */}
                        {/* <RedditShareButton url={props.referralUrl}><RedditIcon size={24} round={true} /></RedditShareButton> */}
                        <TelegramShareButton url={props.referralUrl}><TelegramIcon size={24} round={true} /></TelegramShareButton>
                        {/* <TumblrShareButton url={props.referralUrl}><TumblrIcon size={24} round={true} /></TumblrShareButton> */}
                        <TwitterShareButton url={props.referralUrl}><TwitterIcon size={24} round={true} /></TwitterShareButton>
                        {/* <ViberShareButton url={props.referralUrl}><ViberIcon size={24} round={true} /></ViberShareButton> */}
                        {/* <VKShareButton url={props.referralUrl}><VKIcon size={24} round={true} /></VKShareButton> */}
                        <WhatsappShareButton url={props.referralUrl}><WhatsappIcon size={24} round={true} /></WhatsappShareButton>
                        {/* <WorkplaceShareButton url={props.referralUrl}><WorkplaceIcon size={24} round={true} /></WorkplaceShareButton> */}
                    </div>
                </div>
            </Container>


        </Authenticated>
    );
}
