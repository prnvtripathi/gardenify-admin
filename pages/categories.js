"use client"

import { useEffect, useState } from "react"
import Layout from "@/components/Layout"
import axios from "axios"
import { FaPen, FaTrash } from "react-icons/fa"
import Loader from "@/components/Loader"
import Head from "next/head"


const Categories = () => {

    const [editedCategory, setEditedCategory] = useState(null)
    const [name, setName] = useState('')
    const [categories, setCategories] = useState([])
    const [parent, setParent] = useState('')
    const [loading, setLoading] = useState(false)
    const [properties, setProperties] = useState([])

    useEffect(() => {
        fetchCategories()
    }, [])

    function fetchCategories() {
        setLoading(true);
        axios.get('/api/categories')
            .then(res => {
                setCategories(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }


    async function saveCategory(e) {
        e.preventDefault()
        const data = {
            name,
            parent,
            properties: properties.map(p => ({
                name: p.name,
                values: p.values.split(',')
            })),
        }
        if (editedCategory) {
            data._id = editedCategory._id
            await axios.put('/api/categories', data)
        }
        else {
            await axios.post('/api/categories', data)
        }
        setName('')
        setParent('')
        setEditedCategory(null)
        setProperties([])
        fetchCategories()
    }

    function editCategory(category) {
        setEditedCategory(category)
        setName(category.name)
        setParent(category.parent?._id)
        setProperties(
            category.properties.map(({ name, values }) => ({
                name,
                values: values.join(',')
            }))
        )
    }

    async function deleteCategory(category) {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${category.name}?`);
        if (confirmDelete) {
            const _id = category._id
            await axios.delete('/api/categories?_id=' + _id)
            fetchCategories();
        }
    }

    function addProperty() {
        setProperties(prev => {
            return [...prev, { name: '', values: '' }];
        });
    }

    function handlePropertyNameChange(index, property, newName) {
        setProperties(prev => {
            const newProperties = [...prev]
            newProperties[index].name = newName
            return newProperties
        })
    }

    function handlePropertyValuesChange(index, property, newValues) {
        setProperties(prev => {
            const newProperties = [...prev]
            newProperties[index].values = newValues
            return newProperties
        })
    }


    return (
        <>
            <Head>
                <title>Categories</title>
            </Head>
            <Layout>
                <h1>Categories</h1>
                <label>{editedCategory ? `Edit Category ${editedCategory.name}` : 'Create new category'}</label>
                <form onSubmit={saveCategory}>
                    <div className="md:flex md:gap-2 items-center my-1 md:flex-wrap">
                        <input
                            type="text"
                            className='border border-gray-300 rounded-lg p-1 m-0 md:w-1/2'
                            placeholder="Category name"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                        <select
                            className="my-0 py-1 md:w-1/2"
                            value={parent}
                            onChange={(e) => setParent(e.target.value)}
                        >
                            <option value="1">No Parent Category</option>
                            {categories.length > 0 && categories.map(category => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="my-1">
                        <label className="block">Properties</label>
                        <button type="button" onClick={addProperty} className="default text-sm mb-2">Add new property</button>
                        {properties.length > 0 && properties.map((property, index) => (
                            <div key={index} className="flex gap-2 items-center md:w-1/2">
                                <input
                                    type="text"
                                    value={property.name}
                                    onChange={(ev) => handlePropertyNameChange(index, property, ev.target.value)}
                                    placeholder="property name (like: height)"
                                />
                                <input
                                    type="text"
                                    value={property.values}
                                    onChange={(ev) => handlePropertyValuesChange(index, property, ev.target.value)}
                                    placeholder="property values (like: 10, 20, 30)"
                                />
                                <button
                                    type="button"
                                    className="red text-sm mb-2"
                                    onClick={() => setProperties(prev => prev.filter((_, i) => i !== index))}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    {editedCategory && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditedCategory(null)
                                setName('')
                                setParent('')
                                setProperties([])
                            }}
                            className="default my-1"
                        >
                            Cancel
                        </button>
                    )}
                    <button type='submit' className='btn-primary'>Save</button>
                </form>
                <div className="overflow-x-auto w-full md:w-11/12 mx-auto">
                    {!editedCategory && (
                        <table className="basic table-auto w-full">
                            {loading && <Loader />}
                            <thead>
                                <tr>
                                    <td>Category Name</td>
                                    <td>Parent Category</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.length > 0 && categories.map(category => (
                                    <tr key={category._id}>
                                        <td>{category.name}</td>
                                        <td>{category?.parent?.name}</td>
                                        <td>
                                            <div className="flex gap-1 items-center">
                                                <button
                                                    onClick={() => editCategory(category)}
                                                    className="default"
                                                >
                                                    <FaPen />Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteCategory(category)}
                                                    className="red"
                                                >
                                                    <FaTrash />Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </Layout>
        </>

    )
}

export default Categories