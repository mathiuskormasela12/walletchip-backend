// ==== import module
const response = require('../helpers/response')
const bcrypt = require('bcryptjs')

// ===== import models
const transactionsModel = require('../models/Transaction')
const usersModel = require('../models/User')

exports.createTransfer = async (req, res) => {
  const {
    receiverId,
    transactionDate,
    note,
    amount,
    pin
  } = req.body

  const {
    id: senderId
  } = req.userData

  try {
    const pinHashed = await usersModel.findByCondition({
      id: senderId
    })

    if (!(await bcrypt.compare(pin, pinHashed[0].pin))) {
      return response(res, 400, false, 'Wrong pin')
    } else {
      try {
        const pastBalanceSender = await usersModel.findByCondition({
          id: senderId
        })

        const pastBalanceReceiver = await usersModel.findByCondition({
          id: receiverId
        })

        if (!pastBalanceSender || !pastBalanceReceiver) {
          return response(res, 400, false, 'Failed to get past balance, unkown id')
        } else {
          const balanceMin = Number(pastBalanceSender[0].balance) - Number(amount)
          const balanceMax = Number(pastBalanceReceiver[0].balance) + Number(amount)

          if (Number(pastBalanceSender[0].balance) < 1) {
            return response(res, 400, false, 'No balance')
          } else if (Number(pastBalanceSender[0].balance) < Number(amount)) {
            return response(res, 400, false, 'Insufficient balance')
          }

          try {
            const transferSender = await usersModel.updateByCondition({ balance: balanceMin }, {
              id: senderId
            })
            const transferReceiver = await usersModel.updateByCondition({ balance: balanceMax }, {
              id: receiverId
            })

            if (!transferReceiver || !transferSender) {
              return response(res, 400, false, 'Failed to transfer')
            } else {
              try {
                const data = [
                  {
                    receiver_id: receiverId,
                    transactionDate,
                    note,
                    amount,
                    sender_id: senderId,
                    is_transfer: 1
                  },
                  {
                    receiver_id: receiverId,
                    transactionDate,
                    note,
                    amount,
                    sender_id: senderId,
                    is_transfer: 0
                  }
                ]
                const insertTransaction = await transactionsModel.create(data)

                if (!insertTransaction) {
                  return response(res, 400, false, 'Failed to transfer')
                } else {
                  try {
                    const receiverData = await usersModel.findByCondition({
                      id: receiverId
                    })
                    return response(res, 200, false, 'Transfer Success', {
                      id: insertTransaction,
                      ...req.body,
                      phone: receiverData[0].phone,
                      firstName: receiverData[0].first_name,
                      lastName: receiverData[0].last_name,
                      picture: `${process.env.APP_URL}/uploads/${receiverData[0].picture}`,
                      pin: undefined
                    })
                  } catch (err) {
                    console.log(err)
                    return response(res, 500, false, 'Failed to get sender data, server errror')
                  }
                }
              } catch (err) {
                console.log(err)
                return response(res, 500, false, 'Failed to transfer, server errror')
              }
            }
          } catch (err) {
            console.log(err)
            return response(res, 500, false, 'Failed to transfer, server errror')
          }
        }
      } catch (err) {
        console.log(err)
        return response(res, 500, false, 'Failed to get past balance, server errror')
      }
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Failed to verify pin, server error')
  }
}
