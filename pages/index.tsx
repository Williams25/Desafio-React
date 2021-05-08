import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import {
  DataGrid,
  GridApi,
  GridCellValue,
  GridColDef,
} from "@material-ui/data-grid";
import { IconButton } from "@material-ui/core";
import {
  Delete,
  Create,
  CreateNewFolder,
  Visibility,
} from "@material-ui/icons";
import "@material-ui/styles";
import {
  ModalFormUpdate,
  ModalFormCreate,
  ModalDelete,
  ModalViewProduct,
} from "../src/components";
import { ProductContext } from "../src/contexts";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  h1 {
    font-family: Inter, sans-serif;
    font-size: 2rem;
    color: #666666;
    margin-top: 2rem;
  }
  .header {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    align-content: center;
    text-align: center;
  }
`;

const DataGridTable = () => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [isModalActiveDelete, setIsModalActiveDelete] = useState<boolean>(
    false
  );
  const [
    isModalActiveViewProduct,
    setIsModalActiveViewProduct,
  ] = useState<boolean>(false);

  const [data, setData] = useState<any>("");

  const { productsList, loadingProducts } = useContext(ProductContext);

  const activeAndDisabledModal = () => setIsModalActive(!isModalActive);
  const activeAndDisabledModalDelete = () =>
    setIsModalActiveDelete(!isModalActiveDelete);

  const activeAndDisabledModalViewProduct = () =>
    setIsModalActiveViewProduct(!isModalActiveViewProduct);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70, hide: true },
    {
      field: "code",
      headerName: "SKU",
      width: 130,
      filterable: true,
    },
    { field: "name", headerName: "Nome", width: 130 },
    {
      field: "price",
      headerName: "Preço",
      width: 130,
    },
    {
      field: "category",
      headerName: "Categoria",
      width: 150,
    },
    {
      field: "",
      headerName: "Opções",
      sortable: false,
      width: 200,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const findDataProduct = () => {
          const api: GridApi = params.api;
          const fields = api
            .getAllColumns()
            .map((c) => c.field)
            .filter((c) => c !== "__check__" && !!c);
          const thisRow: Record<string, GridCellValue> = {};

          fields.forEach((f) => {
            thisRow[f] = params.getValue(f);
          });

          setData(thisRow);
        };

        return (
          <>
            <IconButton
              size="small"
              onClick={() => {
                findDataProduct();
                activeAndDisabledModalViewProduct();
              }}
              style={{ margin: "0.5rem", padding: "0.5rem" }}
            >
              <Visibility color="primary" fontSize="default" />
            </IconButton>

            <IconButton
              size="small"
              onClick={() => {
                findDataProduct();
                activeAndDisabledModal();
              }}
              style={{ margin: "0.5rem", padding: "0.5rem" }}
            >
              <Create color="secondary" fontSize="default" />
            </IconButton>

            <IconButton
              size="small"
              onClick={() => {
                findDataProduct();
                activeAndDisabledModalDelete();
              }}
              style={{
                margin: "0.5rem",
                padding: "0.5rem",
              }}
            >
              <Delete color="error" fontSize="default" />
            </IconButton>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    loadingProducts();
  }, []);

  return (
    <Container>
      <div style={{ height: 400, width: "48.4%" }}>
        <div className="header">
          <h1>Produtos</h1>
          <ModalFormCreate
            icon={() => (
              <CreateNewFolder
                color="primary"
                fontSize="default"
                style={{
                  margin: "1px",
                  padding: "1px",
                }}
              />
            )}
          />
        </div>
        <DataGrid
          rows={productsList}
          columns={columns}
          pageSize={5}
          hideFooterSelectedRowCount={false}
          disableColumnMenu={false}
          disableExtendRowFullWidth={true}
          disableColumnSelector={true}
          disableSelectionOnClick={true}
        />
      </div>

      <ModalFormUpdate
        isModalActive={isModalActive}
        data={data}
        activeAndDisabledModal={() => {
          activeAndDisabledModal();
        }}
      />

      <ModalDelete
        isModalActive={isModalActiveDelete}
        data={data}
        activeAndDisabledModal={() => {
          activeAndDisabledModalDelete();
        }}
      />

      <ModalViewProduct
        isModalActive={isModalActiveViewProduct}
        data={data}
        activeAndDisabledModal={() => {
          activeAndDisabledModalViewProduct();
        }}
      />
    </Container>
  );
};

export default DataGridTable;
