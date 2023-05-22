import React from "react";
import moment from "moment/moment";
import {CellWrapper, RowInCell} from "../../containers/StyledComponents";

export const CalendarGridHeader = ()=>(
    <>
        {[...Array(7)].map((_,i)=>(
            <CellWrapper isHeader isSelectedMonth key={i}>
                <RowInCell justifyContent={'flex-end'} pr={1}>
                    {moment().day(i+1).format('ddd')}
                </RowInCell>
            </CellWrapper>
        ))
        }
    </>
)