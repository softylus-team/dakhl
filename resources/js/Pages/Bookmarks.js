import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Link, Head } from '@inertiajs/inertia-react';
import LocalizedStrings from 'react-localization';
import stringss from "../../strings";
import Button from '@/Components/Button';
import Container from '@/components/container';
import Property from '@/components/property';

export default function Bookmarks(props) {
    // console.log(props.properties);
    let strings = new LocalizedStrings(stringss);
    strings.setLanguage(props.locale);
    return (
        <Authenticated
            locale={props.locale}
            auth={props.auth}
            errors={props.errors}
            header={strings.bookmarks}
            menu={props.menu}
            strings={strings}
        >
            <Head title={strings.bookmarks} />

            {props.properties.length ?
                <Container>
                    <div className='grid grid-cols-3 gap-6'>
                        {props.properties.map(function (property, index) {
                             return (
                                <Property key={index} locale={props.locale} property={property} strings={strings} saved={true}/>
                            );
                        })}
                    </div>
                </Container>
                :
                <Container className={"h-full text-center flex flex-col justify-center align-center"}>
                    <img className='w-500 mx-auto' src="/appIcons/noBookmarks.svg" />
                    <h2 className='py-2 text-l-gray text-lg font-semibold'>{strings.noResults}<br />{strings.noBookmarks}</h2>
                    <Link className="my-50 mx-auto w-1/4" href="/">
                        <Button type="button" className='flex justify-center w-full'>{strings.goToProps}
                        </Button>
                    </Link>
                </Container>
            }

        </Authenticated>
    );
}
