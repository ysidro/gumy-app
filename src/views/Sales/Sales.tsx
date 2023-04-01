import { View, ScrollView, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';

import { getSalesFailure, getSalesSuccess } from '../../store/reducers/saleReducer';
import { GumySaleResumeCard } from '../../common/Cards';
import { salesResume } from '../../styles/Global';
import { SaleService } from '../../service';
import { GumyButton } from '../../common';
import { RootState } from '../../store';

const SalesScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const sales = useSelector((state: RootState) => state.sale.sales);
  useEffect(() => {
    getValueFor('uToken');
  }, []);

  async function getValueFor(key: string) {
    try {
      let token = await SecureStore.getItemAsync(key);
      if (token !== null) {
        const result = await new SaleService().getSales<any>(token);
        if (result.success && result.data) {
          dispatch(getSalesSuccess(result.data));
        } else {
          throw new Error('no data.');
        }
      } else {
        throw new Error('no data.');
      }
    } catch (error: any) {
      dispatch(getSalesFailure(error.message));
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={salesResume.salesReportContent}>
          {sales ? (
            <>
              <GumySaleResumeCard title="Enero" value={sales.P1} />
              <GumySaleResumeCard title="Febrero" value={sales.P2} />
              <GumySaleResumeCard title="Marzo" value={sales.P3} />
              <GumySaleResumeCard title="Abril" value={sales.P4} />
              <GumySaleResumeCard title="Mayo" value={sales.P5} />
              <GumySaleResumeCard title="Junio" value={sales.P6} />
              <GumySaleResumeCard title="Julio" value={sales.P7} />
              <GumySaleResumeCard title="Agosto" value={sales.P8} />
              <GumySaleResumeCard title="Septiembre" value={sales.P9} />
              <GumySaleResumeCard title="Octubre" value={sales.P10} />
              <GumySaleResumeCard title="Noviembre" value={sales.P11} />
              <GumySaleResumeCard title="Diciembre" value={sales.P12} />
            </>
          ) : (
            ''
          )}
        </View>
        <View>
          <GumyButton title="Ordenes" onPress={() => navigation.navigate('Order')} />
          <GumyButton title="Crear Nueva Orden" onPress={() => navigation.navigate('CrearOrden')} />
          <GumyButton title="Reporte de Ventas" onPress={() => navigation.navigate('ViewsReport')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export { SalesScreen };
