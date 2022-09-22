
import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import Select from '@/Components/SelectReviews';
import SingleReview from '@/Components/singleReviews';
import ValidationErrors from '@/Components/ValidationErrors';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Textarea from '@/Components/Textarea';
export default function ReviewsForm({ strings, locale, Reviews,property_id }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        property_id: property_id ,
        message: '',
        rating: '',
    });
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'file' ? event.target.files : event.target.value);
    };
    const ReviewDeleteUpdate = (e) => {
        e.preventDefault();
        if (e.nativeEvent.submitter.name == "update") {
            post(route('reviewupdate'));
            // location.reload();
        }
        if (e.nativeEvent.submitter.name == "delete") {
            post(route('reviewdelete'));
            // location.reload();
        }
        if (e.nativeEvent.submitter.name == "save") {
            post(route('reviewsave'));
            location.reload();
        }
    };
    return (
        <div className={`flex flex-col gap-2.5 ${locale == 'ar' ? "pr-12" : "pl-12"}`}>
            {(Reviews) ?
                Reviews.map(function (review, index) {
                    return (
                        <>
                            <SingleReview key={index} imgPath={review.author_photo} rating={review.rating} message={review.message} authorName={review.author_name} />
                            <hr className='my-4' />

                        </>
                    );
                }) :
                <p className='text-l-gray text-sm'>{strings.noReviews}</p>
            }

            <p className='text-d-gray font-normal text-base '>{strings.addReview}</p>
            <form onSubmit={ReviewDeleteUpdate}>
                <ValidationErrors errors={errors} />

                <Input
                    type="hidden"
                    name={`author_id`}
                    value={data[`author_id`]}
                    className="mt-1 block w-full"
                    handleChange={onHandleChange}
                />
                <div className="">
                    <Select
                        name={`rating`}
                        value={data[`rating`]}
                        className="mt-1 block w-full"
                        autoComplete={`rating`}
                        items={strings.ratings}
                        placeholder={strings.rating}
                        handleChange={onHandleChange}
                        required
                    />

                </div>
                <div className="mt-4">

                    <Textarea
                        name={`message`}
                        value={data[`message`]}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                        placeholder={strings.addHere}
                        required
                    />
                </div>


                <Input
                    type="hidden"
                    name="property_id"
                    value={data.property_id}
                    className="mt-1 block w-full"
                    handleChange={onHandleChange}
                    required
                />
                <div className="flex items-center justify-end mt-4">
                    <Button className="w-1/2 flex justify-center" processing={processing} name="save">
                        {strings.submit}
                    </Button>


                </div>
            </form>
        </div>
    )

}
