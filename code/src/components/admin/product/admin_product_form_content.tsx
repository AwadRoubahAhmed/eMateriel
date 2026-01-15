'use client'

import {  useId, useState } from "react";
import { useForm } from "react-hook-form"
import type { Product } from "../../../../models/product";
import ApiProductService from "../../../services/api_product_service";
import type { AdminProductFormContentProps } from "../../../models/props/admin_product_form_content_props";
import { useNavigate } from "react-router-dom";
import Seo from "../../Seo";

const AdminProductFormContent = ({ categories }: AdminProductFormContentProps) => {
  // States;
  const idId = useId();
  const nameId = useId();
  const imageId = useId();
  const priceId = useId();
  const descriptionId = useId();
  const stockId = useId();
  const categoryId = useId();

  // useNavigate permet de créer une rédirection
  const navigate = useNavigate()

  const [message, setMessage] = useState<string>("")

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Product>();

  // Comportements;
 


  const submitForm = async (data: Product) => {
    console.log(data);

    const formData = new FormData();
    formData.set('id', data.id as unknown as string);
    formData.set('name', data.name);
    formData.set('image', data.image);
    formData.set('price', data.price as unknown as string);
    formData.set('description', data.description);
    formData.set('stock', data.stock as unknown as string);
    formData.set('category_id', data.category_id as unknown as string);

    const process = await new ApiProductService().insert(formData)

    console.log(process);

    if ([200, 201].indexOf(process.status) !== -1) {
      navigate('/admin/products')
    } else if ([400].indexOf(process.status) !== -1) {
      setMessage(process.message as unknown as string)
    }

  }

  return (
    <>
      <Seo
        title="eMatériel - Panier"
        description="La page Panier"
        url="/panier"
      />


      <h1>AdminFormHome</h1>

      <form encType="multipart/form-data" onSubmit={handleSubmit(submitForm)} >
        {/* name */}
        <div>
          <label htmlFor={nameId}>Nom :</label>
          <input type="text" id={nameId} {...register('name', { required: 'Le nom est obligatoire', minLength: { value: 5, message: 'Le nom doit comporter 5 caractères au minimum' }, maxLength: { value: 50, message: 'Le nom doit comporter 50 caractères au maximum' } })} />
          <small role="alert">{errors.name?.message}</small>
        </div>
        {/* image */}
        <div>
          <label htmlFor={imageId}>Image :</label>
          <input type="file" id={nameId} {...register('image', { required: 'Le champs image est obligatoire', maxLength: { value: 150, message: "L'image doit comporter 150 caractères au maximum" } })} />
          <small>{errors.image?.message}</small>
        </div>
        {/* price */}
        <div>
          <label htmlFor={priceId}>Price :</label>
          <input type="number" id={priceId} {...register('price', { required: 'Le champs price est obligatoire' })} />
          <small>{errors.price?.message}</small>
        </div>
        {/* description */}
        <div>
          <label htmlFor={descriptionId}>Description :</label>
          <textarea id={descriptionId} {...register('description', { required: 'Le champs description est obligatoire' })} />
          <small>{errors.description?.message}</small>
        </div>
        {/* stock */}
        <div>
          <label htmlFor={stockId}>Stock :</label>
          <input type="number" id={stockId} {...register('stock', { required: 'Le champs image est obligatoire' })} />
          <small>{errors.stock?.message}</small>
        </div>
        {/* category_id */}
        <div>
          <label htmlFor={categoryId}>Catégorie :</label>

          <select id={categoryId} {...register('category_id', { required: 'La catégorie est obligatoire' })}>
            <option value="">Sélectionner une catégorie</option>
            {
              categories.map(category => <option value={category.id} key={category.id}>{category.name}</option>)
            }

          </select>

          <small>{errors.category_id?.message}</small>
        </div>

        <div>
          <input type="hidden" id={idId} {...register('id')} />
          <button type="submit">Ajouter un produit</button>
        </div>

      </form>

    </>
  )
}

export default AdminProductFormContent