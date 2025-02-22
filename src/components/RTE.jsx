//RTE - real time editor
//we are going to use tinyMCE - which is a 3rd party text editor component
//to use something from 3rd party react hook form provide us with the method known as controller
//Controller - it's hard to avoid working with external controlled component such as React-Select.
//This wrapper component will make it easier for you to work with them.
//and this controller will give the control of these 3rd party form back to the react hook form

import React from 'react'
import { Controller } from 'react-hook-form'
import { Editor } from '@tinymce/tinymce-react'

//control: if parent is invoking any child child form then child can give some data back to it
//name: unique name of input
//render: whatever we want to render into it
function RTE({
    name,
    control,
    label,
    defaultValue = ""
}) {
    return (
        <div className='w-full'>
            {
                label && <label
                    className='inline-block n=mb-1 pl-1'>
                    {label}</label>
            }
            <Controller
                name={name || "Content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey='5odupvo3xu2o3u1ba6d1htya9qm3moiwsgspd4jhk2axvspu'
                        initialValue={defaultValue}
                        init={{
                            branding: false,
                            height: 500,
                            menubar: true,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}

export default RTE