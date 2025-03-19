// // ## PLACEHOLDER ##

//
// import {
//   container,
//   hstack,
//   flex,
//   vstack
// } from '@cerberus/styled-system/patterns';
// import {
//   Button,
//   Field,
//   FieldMessage,
//   Label,
//   Input,
//   Modal,
//   ModalHeader,
//   ModalHeading,
//   ModalDescription,
//   useModal,
//   trapFocus
// } from '@cerberus/react';
// import { css } from '@cerberus/styled-system/css';
// import {
//   useFindMarketplaceOrderItems,
//   useGetMarketplaceOrderItem
// } from '@/api/marketplace-order-items';
// import { useRouter } from 'next/router';
// import { useForm, Controller } from 'react-hook-form';
// import { useCallback } from 'react';

// const MarketplaceOrders = ({ missionPartnerId, orderItemId }) => {
//   const { marketplaceOrderItems, marketplaceOrderItemsLoading } =
//     useFindMarketplaceOrderItems();

//   const router = useRouter();

//   const handleOrderClick = id => {
//     router.push({
//       pathname: router.pathname + `/[orderItemId]`,
//       query: { missionPartnerId, orderItemId: id }
//     });
//   };

//   const { modalRef, show, close } = useModal();
//   const modalHandleKeyDown = trapFocus(modalRef);

//   const handleSaveNewOrder = useCallback(async data => {
//     // Takes the form data and saves it to the database
//     await createMarketplaceOrder(data);
//     console.log('data', data);
//     console.log('save');
//     // await 2 seconds
//     await new Promise(resolve => setTimeout(resolve, 2000));

//     close();
//   }, []);

//   const {
//     control,
//     handleSubmit,
//     formState: { isSubmitting }
//   } = useForm();

//   return (
//     <div>
//       <div className={flex()}>
//         <h2
//           className={css({
//             textStyle: 'h2',
//             color: 'page.text.initial'
//           })}
//         >
//           Order History...
//         </h2>
//       </div>

//       <div className={container()}>
//         <Button onClick={show}>Create New Order</Button>
//         <div className={hstack()}></div>
//         <h3
//           className={css({
//             textStyle: 'h2',
//             color: 'page.text.initial'
//           })}
//         >
//           Orders
//         </h3>
//         <ul
//           className={css({
//             textStyle: 'body-md'
//           })}
//         >
//           {marketplaceOrdersLoading && <p>Loading...</p>}
//           {!marketplaceOrdersLoading && marketplaceOrders?.length === 0 && (
//             <p>No orders found.</p>
//           )}
//           <p>Orders found!</p>
//           {console.log('marketplaceOrders: ', marketplaceOrders)}
//           {marketplaceOrders?.map((order, indx) => {
//             console.log('order found: ', order);
//             return (
//               <div className={css({ cursor: 'pointer' })} key={indx}>
//                 <li
//                   key={order.id}
//                   onClick={() => handleOrderClick(order.id)}
//                   className={hstack()}
//                 >
//                   <h4>{order.name}</h4>
//                   <p>{order.shortDescription}</p>
//                   <img src={order.logoPath} alt={order.name} />
//                 </li>
//               </div>
//             );
//           })}
//         </ul>
//       </div>

//       <Modal onKeyDown={modalHandleKeyDown} ref={modalRef}>
//         <ModalHeader>
//           <ModalHeading>Create New Order</ModalHeading>
//         </ModalHeader>
//         <ModalDescription>
//           Use this form to create a new marketplace order.
//         </ModalDescription>

//         <form onSubmit={handleSubmit(handleSaveNewOrder)}>
//           <Controller
//             name="name"
//             control={control}
//             defaultValue=""
//             rules={{ required: 'A name is required.' }}
//             render={({ field: { ref, ...field }, fieldState }) => (
//               <Field {...fieldState}>
//                 <Label htmlFor="name">Name</Label>
//                 <Input
//                   describedBy="help:name"
//                   id="name"
//                   placeholder="Order name"
//                   type="text"
//                   {...field}
//                 />
//                 <FieldMessage id="help:name">
//                   The name of the order.
//                 </FieldMessage>
//               </Field>
//             )}
//           />

//           <Controller
//             name="slug"
//             control={control}
//             defaultValue=""
//             rules={{ required: 'A slug is required.' }}
//             render={({ field: { ref, ...field }, fieldState }) => (
//               <Field {...fieldState}>
//                 <Label htmlFor="slug">Slug</Label>
//                 <Input
//                   describedBy="help:slug"
//                   id="slug"
//                   placeholder="Slug"
//                   type="text"
//                   {...field}
//                 />
//                 <FieldMessage id="help:slug">
//                   The slug of the order.
//                 </FieldMessage>
//               </Field>
//             )}
//           />

//           <Controller
//             name="shortDescription"
//             control={control}
//             defaultValue=""
//             rules={{ required: 'A short description is required.' }}
//             render={({ field: { ref, ...field }, fieldState }) => (
//               <Field {...fieldState}>
//                 <Label htmlFor="shortDescription">Short Description</Label>
//                 <Input
//                   describedBy="help:shortDescription"
//                   id="shortDescription"
//                   placeholder="Short description"
//                   type="text"
//                   {...field}
//                 />
//                 <FieldMessage id="help:shortDescription">
//                   A short description of the order.
//                 </FieldMessage>
//               </Field>
//             )}
//           />

//           <Controller
//             name="description"
//             control={control}
//             defaultValue=""
//             rules={{ required: 'A description is required.' }}
//             render={({ field: { ref, ...field }, fieldState }) => (
//               <Field {...fieldState}>
//                 <Label htmlFor="description">Description</Label>
//                 <Input
//                   describedBy="help:description"
//                   id="description"
//                   placeholder="Description"
//                   type="text"
//                   {...field}
//                 />
//                 <FieldMessage id="help:description">
//                   A description of the order.
//                 </FieldMessage>
//               </Field>
//             )}
//           />

//           <Controller
//             name="logoUrl"
//             control={control}
//             defaultValue=""
//             rules={{ required: 'A logo URL is required.' }}
//             render={({ field: { ref, ...field }, fieldState }) => (
//               <Field {...fieldState}>
//                 <Label htmlFor="logoUrl">Logo URL</Label>
//                 <Input
//                   describedBy="help:logoUrl"
//                   id="logoUrl"
//                   placeholder="Logo URL"
//                   type="text"
//                   {...field}
//                 />
//                 <FieldMessage id="help:logoUrl">
//                   The URL of the order's logo.
//                 </FieldMessage>
//               </Field>
//             )}
//           />

//           <div className={hstack()}>
//             <Button
//               disabled={isSubmitting}
//               palette="action"
//               shape="rounded"
//               usage="filled"
//               type="submit"
//             >
//               {isSubmitting ? 'Saving...' : 'Save'}
//             </Button>
//             <Button usage="outlined" onClick={close} type="button">
//               Close
//             </Button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default MarketplaceOrders;

export default function MarketplaceOrders() {
  return <div>commented out</div>;
}
