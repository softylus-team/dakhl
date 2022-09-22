import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import Textarea from '@/Components/Textarea';
import SelectReviews from '@/Components/SelectReviews';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Reviews({ Reviews, strings, auth, locale }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        author_id: auth.user.id,
        message: '',
        rating: '',
    });

    const onHandleChange = (event) => {
        // console.log(event.target.name, "---", event.target.type, "---", event.target.value);
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.type === 'file' ? event.target.files : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('addReview'));
    };
    // console.log(Reviews);
    return (
        <div className="max-w-6xl mx-auto mt-6 mb-6 sm:px-6 lg:px-8">
            <ValidationErrors errors={errors} />
            {auth.user ? (
                auth.user.role === "admin" ? (
                    <table>
                        <thead><tr>
                            <th>{strings.username}</th>
                            <th>{strings.rating}</th>
                            <th>{strings.message}</th>
                            <th></th></tr>
                        </thead>
                        <tbody>
                            {(Reviews) ?
                                Reviews.map(function (review, index) {
                                    return (
                                        <tr key={index} className="text-center">
                                            <td>{review.author_name}</td>
                                            <td>{review.rating}</td>
                                            <td>{review.message}</td>
                                            <td>
                                                {review.approved ? <p>{strings.approved}</p> :
                                                    
                                                        <Link href={route('approveReview',review.id)} className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150">
                                                            {strings.approve}
                                                        </Link>
                                                    
                                                }
                                                <Link href={route('deleteReview', review.id)} className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150">
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })

                                : <p>No Partners Found</p>
                            }</tbody>
                    </table>
                ) : <>
                    <form onSubmit={submit} >

                        <Input
                            type='hidden'
                            name="author_id"
                            value={data.author_id}
                            handleChange={onHandleChange}
                            required />


                        <div className="mt-4">
                            <Label forInput="rating" value={strings.rating} />
                            <SelectReviews
                                name="rating"
                                value={data.rating}
                                handleChange={onHandleChange}
                                items={strings.ratings}
                                required />

                        </div>
                        <div className="mt-4">
                            <Label forInput="message" value={strings.message} />
                            <Textarea
                                name="message"
                                value={data.message}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                                required
                            />

                        </div>



                        <div className="flex items-center justify-end mt-4">

                            <Button className="ml-4" processing={processing}>
                                {strings.addReview}
                            </Button>
                        </div>
                    </form>
                    <h3>{strings.myReviews}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>{strings.rating}</th>
                                <th>{strings.message}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {(Reviews) ?
                                Reviews.map(function (review, index) {
                                    return (
                                        (auth.user.id === review.author_id) ?
                                            <tr key={index} className="text-center">
                                                <td>{review.rating}</td>
                                                <td>{review.message}</td>
                                                <td>
                                                    {review.approved ? <p>{strings.approved}</p> : <p>{strings.pending}</p>}
                                                    <Link href={route('deleteReview', review.id)} className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150">
                                                        Delete
                                                    </Link>
                                                </td>
                                            </tr> : <p>No Reviews Found</p>
                                    )
                                })

                                : <p>No Reviews Found</p>
                            }</tbody>
                    </table></>
            ) : ""}

        </div>
    );
}
